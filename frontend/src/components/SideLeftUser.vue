<template>
  <div class="side-wrap">
    <p>User</p>
    <select v-model="selectedSport">
      <option value="1">Теннис</option>
      <option value="2">Футбол</option>
      <option value="3">Хоккей</option>
      <option value="4">Баскетбол</option>
    </select>
    <div class="sb-btn" @click="btn_sport()">Выполнить</div>
  </div>
</template>

<script setup>
import { useGamesStore } from "@/stores/GamesStore";
import { ref } from 'vue';

const selectedSport = ref(false);
const gamesStore = useGamesStore();

const btn_sport = () => {
  console.log("ищем турниры");
  gamesStore.getTurnaments(selectedSport.value);
  // this.$router.push({
  //   path: "/pageone",
  // });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-wrap {
  border: 1px solid red;
  min-width: 250px;
  padding: 10px 0;
}

.sb-btn {
  padding: 10px;
  border: 1px solid red;
  margin: 10px;
  background-color: bisque;
  cursor: pointer;
}
</style>
