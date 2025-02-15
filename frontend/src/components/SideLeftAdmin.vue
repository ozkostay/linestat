<template>
  <div class="side-wrap">
    <p>Admin</p>
    <select v-model="selectedSport">
      <option value="1">Теннис</option>
      <option value="2">Футбол</option>
      <option value="3">Хоккей</option>
      <option value="4">Баскетбол</option>
    </select>
    <div class="sb-btn" @click="sb_btn_click()">Выполнить</div>

    <!-- <div class="sb-btn" @click="sb_btn_click()">Страница 1</div> <div class="sb-btn" @click="sb_btn_click2()">Страница 2</div> <input type="text" v-model="message" placeholder="Введите текст">
    {{ message }} -->
  </div>
</template>

<script>
import { useGamesStore } from "@/stores/GamesStore";

export default {
  data() {
    return {
      message: '',
      selectedSport: 2,
      gamesStore: useGamesStore(),
    };
  },
  name: "SideLeftAdmin",
  props: {
    msg: String,
  },
  methods: {
    sb_btn_click() {
      console.log("sb_btn_click === ");
      this.gamesStore.getGames(this.selectedSport);
      this.$router.push({
        path: "/pageone",
      });
    },
  }
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
