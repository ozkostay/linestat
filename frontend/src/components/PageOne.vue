<template>
  <div class="one-wrap">
    Page One
    <button @click="onQuery">Query</button>
    <table class="tbl">
      <GamesItem v-for="item in gamesStore.games" :key="item.id" :item="item" />
    </table>
  </div>
</template>

<script>
import { useGamesStore } from "@/stores/GamesStore";
import GamesItem from "./GamesItem.vue";
// {{ gamesStore.games }}
export default {
  name: "PageOne",
  data() {
    return {
      gamesStore: useGamesStore(),
    };
  },
  props: {
    msg: String,
  },
  methods: {
    onQuery() {
      this.gamesStore.getGames();
      console.log("onQuery === =", this.games);
    },
  },
  components: {
    GamesItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.one-wrap {
  border: 1px solid red;
  width: 100%;
  padding: 10px;
}

.sb-btn {
  padding: 10px;
  border: 1px solid red;
  margin: 10px;
  background-color: bisque;
  cursor: pointer;
}

.tbl {
  border: 1px solid black;
  border-collapse: collapse; /* Объединяет границы ячеек */
  border-spacing: 0; /* Убирает отступы между границами */
}
</style>
