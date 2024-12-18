import { defineStore } from "pinia";

export const useGamesStore = defineStore("gamesStore", {
  state: () => ({
    games: [1,2,3],
    activeTab: 1,
  }),
  actions: {
    async getGames() {
      try {
        //Access-Control-Allow-Origin: *

        // const url =
        //   "http://localhost:13904/front/empty?sport=2&offset=0&limit=5";
        const url = "http://localhost:13099/test/games";
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const data = await res.json();
        console.log("action pinia data from fetch", data);
        this.games = data;
      } catch (error) {
        console.log("action pinia data from fetch", error);
      }

      // return data;
    },
  },
});
