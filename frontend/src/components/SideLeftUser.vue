<template>
  <div class="side-wrap">
    <label for="sport"><span>Спорт:</span></label>
    <select
      class="side-input"
      id="sport"
      v-model="selectedSport"
      @change="btn_sport()"
    >
      <option value="1">Теннис</option>
      <option value="2">Футбол</option>
      <option value="3">Хоккей</option>
      <option value="4">Баскетбол</option>
    </select>

    <label for="turnament">Турнир:</label>
    <select
      class="side-input"
      id="turnament"
      v-if="turnaments.length > 0"
      v-model="selectedTurnaments"
      @change="onTurnament()"
    >
      <option v-for="item in turnaments" :key="item.id" :value="item.id">
        {{ item.name_ru }}
      </option>
    </select>

    <label for="player">Игрок:</label>
    <select
      class="side-input"
      id="player"
      v-if="players.length > 0"
      v-model="selectedPlayers"
    >
      <option v-for="item in players" :key="item.id" :value="item.id">
        {{ item.name_ru }}
      </option>
    </select>

    <div class="sb-btn" @click="btn_go()">Go</div>
  </div>
</template>

<script setup>
import { useGamesStore } from "@/stores/GamesStore";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const router = useRouter();

const gamesStore = useGamesStore();
const selectedSport = ref(null);
const selectedTurnaments = ref(null);
const selectedPlayers = ref(null);
const { turnaments, players } = storeToRefs(gamesStore);

//====== functions ====================
const btn_sport = () => {
  // console.log("ищем турниры");
  selectedTurnaments.value = null;
  selectedPlayers.value = null;
  gamesStore.nullPlayers();
  gamesStore.getTurnaments(selectedSport.value);
  // this.$router.push({
  //   path: "/pageone",
  // });
};

const btn_go = () => {
  // console.log("спорт", selectedSport.value);
  // console.log("турнир", selectedTurnaments.value);
  // console.log("игрок", selectedPlayers.value);
  gamesStore.getLines({
    sportId: selectedSport.value,
    turnamentId: selectedTurnaments.value,
    playerId: selectedPlayers.value,
  });
  gamesStore.setCurentPlayer(selectedPlayers.value);
  router.push("/appwork");
};
const onTurnament = () => {
  // console.log("турниры", selectedTurnaments.value);
  selectedPlayers.value = null;
  gamesStore.getPlayers(selectedTurnaments.value);
  // this.$router.push({
  //   path: "/appwork",
  // });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-wrap {
  border: 1px solid red;
  padding: 10px 0;
  width: 200px;
  box-sizing: border-box;
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
  margin: 0 10px 10px 10px;
  background-color: bisque;
  cursor: pointer;
}

label {
  text-align: left;
}
</style>
