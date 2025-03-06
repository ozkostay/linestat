<template>
  <div class="main-wrap">
    WORK
    <!-- <div class="tempdiv" v-for="item in lines" :key="item.id" :item="item">
      {{ item.id }}
    </div> -->
    <table class="tbl">
      <WorkHockey
        v-for="item in lines"
        :key="item.id"
        :item="item"
        @action="onAction"
      />
    </table>
  </div>
</template>

<script setup>
import { useGamesStore } from "@/stores/GamesStore";
import WorkHockey from "./WorkHockey.vue";
// import GamesItem from "./GamesItem.vue";
import { storeToRefs } from "pinia";
// import EditModal from "./EditModal.vue";
// import { ref } from "vue";

// const showModal = ref(false);
// let itemToModal = null;

const gamesStore = useGamesStore();
const { lines } = storeToRefs(gamesStore); // Для реактивного доступа к games

// const onAction = (item, action) => {
//   console.log("===", item, action);
//   // if (action === "delete") {
//   //   gamesStore.toggleDelete(id);
//   // }
//   switch (action) {
//     case "delete":
//       gamesStore.toggleDelete(item.id);
//       break;
//     case "edit":
//       showModal.value = true;
//       itemToModal = item;
//       break;
//     default:
//       console.log("ХЗ");
//   }
// };

// const deleteSelected = () => {
//   const idForDelete = games.value
//     .filter((item) => item.delete)
//     .map((item) => item.id);
//   gamesStore.deleteGames(idForDelete);
// };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrap {
  border: 1px solid red;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.card {
  border: 1px solid blue;
  margin: 10px;
  padding: 10px;
  background-color: bisque;
}

/* .tempdiv {
  border: 1px solid green;
} */

.tbl {
  border: 1px solid black;
  border-collapse: collapse; /* Объединяет границы ячеек */
  border-spacing: 0; /* Убирает отступы между границами */
}
</style>
