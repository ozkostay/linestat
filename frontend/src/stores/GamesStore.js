import { defineStore } from "pinia";

export const useGamesStore = defineStore("gamesStore", {
  state: () => ({
    games: [],
    loader: false,
  }),
  actions: {
    deleteGames(arrId) {
      // const tempArr = this.games.filter((item) => !arrId.includes(item.id));
      // this.games = tempArr;
      this.$patch(state => {
        state.games = state.games.filter((item) => !arrId.includes(item.id));
      });
      console.log('AFTER DELETE', this.games);
    },
    toggleDelete(id) {
      this.games = this.games.map(item => {
        if (item.id === id) {
          return { ...item, delete: !item.delete };
        }
        return item;
      });
    },
    async getGames(sportId) {
      try {
        //Access-Control-Allow-Origin: *
        this.loader = true;
        const url = `http://localhost:13099/api/games/?sport=${sportId}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const data = await res.json();
        console.log("action pinia data from fetch", data);
        const newKey = 'delete';
        const newData = data.map(obj => ({ ...obj, [newKey]: false }));
        this.games = newData;
        this.loader = false;
      } catch (error) {
        console.log("action pinia data from fetch", error);
        this.loader = false;
      }

      // return data;
    },
  },
});
