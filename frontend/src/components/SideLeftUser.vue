<template>
  <div class="side-wrap">
    <p>User</p>
    <select class="side-input" v-model="selectedSport">
      <option value="1">Теннис</option>
      <option value="2">Футбол</option>
      <option value="3">Хоккей</option>
      <option value="4">Баскетбол</option>
    </select>

    <select
      class="side-input"
      v-if="turnaments.length > 0"
      v-model="selectedTurnaments"
    >
      <option v-for="item in turnaments" :key="item.id" :value="item.id">
        {{ item.name_ru }}
      </option>
      <!-- <option value="1">Теннис</option>
      <option value="2">Футбол</option>
      <option value="3">Хоккей</option>
      <option value="4">Баскетбол</option> -->
    </select>

    <div class="sb-btn" @click="btn_sport()">Выполнить</div>
    <div class="sb-btn" @click="btn_test()">Tect</div>
  </div>
</template>

<script setup>
import { useGamesStore } from "@/stores/GamesStore";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const gamesStore = useGamesStore();

const selectedSport = ref(false);
const selectedTurnaments = ref(false);
const { turnaments } = storeToRefs(gamesStore);
// const arrTest = [
//   {
//     id: 11,
//     name: "Turmir 11",
//   },
//   {
//     id: 22,
//     name: "Turmir 22",
//   },
//   {
//     id: 33,
//     name: "Turmir 33",
//   },
// ];
// turnaments

const btn_sport = () => {
  console.log("ищем турниры");
  gamesStore.getTurnaments(selectedSport.value);
  // this.$router.push({
  //   path: "/pageone",
  // });
};

const btn_test = () => {
  console.log("турниры", selectedTurnaments.value);
  // gamesStore.getTurnaments(selectedSport.value);
  // this.$router.push({
  //   path: "/pageone",
  // });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-wrap {
  border: 1px solid red;
  width: 250px;
  padding: 10px 0;
}

.sb-btn {
  padding: 10px;
  border: 1px solid red;
  margin: 10px;
  background-color: bisque;
  cursor: pointer;
}

.side-input {
  padding: 10px;
  width: 90%;
  border: 1px solid red;
  margin: 10px;
  background-color: bisque;
  cursor: pointer;
}
</style>
