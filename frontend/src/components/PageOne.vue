<template>
  <div class="one-wrap">
    <div v-if="gamesStore.loader" class="loader"></div>
    <button @click="deleteSelected">
      Delete selected {{ gamesStore.games.length }}
    </button>
    <EditModal :show="showModal" @close="showModal = false"/>
    <table class="tbl">
      <GamesItem
        v-for="item in games"
        :key="item.id"
        :item="item"
        @action="onAction"
      />
    </table>
  </div>
</template>

<script setup>
import { useGamesStore } from "@/stores/GamesStore";
import GamesItem from "./GamesItem.vue";
import { storeToRefs } from "pinia";
import EditModal from "./EditModal.vue";
import { ref } from 'vue';

const showModal = ref(false);

const gamesStore = useGamesStore();
const { games } = storeToRefs(gamesStore); // Для реактивного доступа к games

const onAction = (id, action) => {
  console.log('===', id, action);
  // if (action === "delete") {
  //   gamesStore.toggleDelete(id);
  // }
  switch (action) {
  case "delete":
    gamesStore.toggleDelete(id);
    break;
  case "edit":
    showModal.value = true;
    break;
  default:
    console.log("ХЗ");
}
};

const deleteSelected = () => {
  const idForDelete = games.value
    .filter((item) => item.delete)
    .map((item) => item.id);
  gamesStore.deleteGames(idForDelete);
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
