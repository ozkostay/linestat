import { defineStore } from "pinia";

export const useSideStore = defineStore("sideStore", {
  state: () => ({
    activeTab: 1,
  }),
  actions: {
    setActiveTab(newTab) {
      this.activeTab = newTab;
    }
    // async getGames() {
    //   try {
    //     //Access-Control-Allow-Origin: *

                            
    //     const url = "http://localhost:13099/api/games/?sport=3";
    //     const res = await fetch(url, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //     });
    //     const data = await res.json();
    //     console.log("action pinia data from fetch", data);
    //     this.games = data;
    //   } catch (error) {
    //     console.log("action pinia data from fetch", error);
    //   }

    //   // return data;
    // },
  },
});
