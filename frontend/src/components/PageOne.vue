<template>
  <div class="one-wrap">
    <div v-if="gamesStore.loader" class="loader"></div>
    <button @click="deleteSelected">Delete selected {{ gamesStore.games.length}}</button>
    <table class="tbl">
      <GamesItem
        v-for="item in gamesStore.games"
        :key="item.id"
        :item="item"
        @action="onAction"
      />
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
    onAction(id, action) {
      console.log("111", id, action);
      if (action === "delete") {
        this.gamesStore.toggleDelete(id);
      }
    },
    deleteSelected() {
      const idForDelete = [];
      this.gamesStore.games.forEach((item) => {
        if (item.delete === true) {
          idForDelete.push(item.id);
        }
      });
      console.log("Delete selected", idForDelete);
      this.gamesStore.deleteGames(idForDelete);
    }
  },
  components: {
    GamesItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

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
