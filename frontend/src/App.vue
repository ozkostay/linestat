<template>
  <div>
    <Header-main />
    <div class="work-wrap">
      <side-left />
      <!-- <RouterView /> -->
      <router-view />
    </div>
    {{ gamesStore.games }}
  </div>
  
</template>

<script>
// import AppMain from "./components/AppMain.vue";
import HeaderMain from "./components/HeaderMain.vue";
import SideLeft from "./components/SideLeft.vue";
import { useMovieStore } from "./stores/MovieStore";
import { useGamesStore } from "./stores/GamesStore";

// const movieStore = useMovieStore();

export default {
  name: "App",
  data() {
    return {
      title: "fffffff",
      movieStore: useMovieStore(),
      gamesStore: useGamesStore(),
    };
  },
  components: {
    HeaderMain,
    SideLeft,
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
  margin: 25px 100px;
}
.work-wrap {
  display: flex;
  min-height: 400px;
}
</style>
