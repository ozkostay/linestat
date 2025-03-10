<template>
  <div>
    <header-main />
    <div class="work-wrap">
      <side-left-admin v-if="sideStore.activeTab === 2" />
      <side-left-user v-if="sideStore.activeTab === 1" />
      <router-view />
    </div>
    {{ gamesStore.lines }}
    <!-- {{ gamesStore.turnaments }} -->
    <hr>
    {{ gamesStore.players }}
  </div>
</template>

<script>
// import AppMain from "./components/AppMain.vue";
import HeaderMain from "./components/HeaderMain.vue";
// import SideLeft from "./components/SideLeft.vue";
import SideLeftAdmin from "./components/SideLeftAdmin.vue";
import SideLeftUser from "./components/SideLeftUser.vue";
import { useGamesStore } from "./stores/GamesStore";
import { useSideStore } from "@/stores/SideStore";

// const movieStore = useMovieStore();

export default {
  name: "App",
  data() {
    return {
      title: "fffffff",
      gamesStore: useGamesStore(),
      sideStore: useSideStore(),
    };
  },
  components: {
    HeaderMain,
    SideLeftAdmin,
    SideLeftUser,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 25px auto;
  width: 1000px;
}
.work-wrap {
  display: flex;
  min-height: 400px;
}
</style>
