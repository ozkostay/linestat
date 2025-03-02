import { defineStore } from "pinia";
import * as _ from 'lodash';

export const useGamesStore = defineStore("gamesStore", {
  state: () => ({
    games: [],
    turnaments: [],
    loader: false,
  }),
  actions: {
    async addResult(id, result, date) {
      const objResult = {
        id,
        result,
        date,
      };
      console.log("Записываем в БД", objResult);

      try {
        const url = `http://localhost:13099/api/oneresult`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(objResult),
        });
        const data = await res.json();
        console.log("Добавили результат", data);
        const idToDelete = [id];
        this.deleteGames(idToDelete); // Удляе так как результат теперь есть
      } catch (error) {
        console.error("Не получилось добавить результат с id=", id);
      }
      
    },
    async getTurnaments(sportId) {
      try {
        //Access-Control-Allow-Origin: *
        this.loader = true;
        const url = `http://localhost:13099/api/turnaments?sportId=${sportId}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("action pinia data from fetch", data);
        const newData = _.sortBy(data, ['name_ru']);
        this.turnaments = newData;
        this.loader = false;
      } catch (error) {
        console.log("action pinia data from fetch", error);
        this.loader = false;
      }
    },
    deleteGames(arrId) {
      // const tempArr = this.games.filter((item) => !arrId.includes(item.id));
      // this.games = tempArr;
      this.$patch((state) => {
        state.games = state.games.filter((item) => !arrId.includes(item.id));
      });
      console.log("AFTER DELETE", this.games);
    },
    toggleDelete(id) {
      this.games = this.games.map((item) => {
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
        // console.log("action pinia data from fetch", data);
        const newKey = "delete";
        const tempNewData = data.map((obj) => ({ ...obj, [newKey]: false }));
        const newData = _.sortBy(tempNewData, ['turnament.name', 'id']);
        // const sortedPeople = _.sortBy(people, ['city', 'age']);
        // ._.sortBy(people, ['city', 'age']);

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
