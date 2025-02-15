<template>
  <div class="dialog" v-if="props.show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <!-- <slot></slot> -->
      <div class="modaldiv">{{ item.id }}</div>
      <div class="modaldiv">
        {{ new Date(item.timestamp).toLocaleDateString() }}
      </div>
      <div class="modaldiv">{{ item.turnament.name }}</div>
      <div class="modaldiv">
        {{ item.player1.name + " - " + item.player2.name }}
      </div>
      <div class="modaldiv">SCORE: <input type="text" v-model="score" /></div>
      <div class="modaldiv">Время: <input type="text" v-model="date" /></div>
      
      <div>
        <button class="modaldiv btn" @click="closeModal">Закрыть</button>
        <button class="modaldiv btn" @click="okModal">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useGamesStore } from "@/stores/GamesStore";
import { ref } from 'vue';
// import { storeToRefs } from "pinia";

const score = ref('');
const date = ref('');
const gamesStore = useGamesStore();
//const { games } = storeToRefs(gamesStore); // Для реактивного доступа к games

const props = defineProps({
  show: Boolean, // Указываем тип Boolean
  item: Object || null,
});

const emit = defineEmits(["close"]);
const closeModal = () => {
  console.log('Закрываем');
  emit("close");
};
const okModal = () => {
  console.log("Записываем");
  gamesStore.addResult(props.item.id, score.value, date.value);
  score.value = '';
  date.value = '';
  emit("close");
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}

.modaldiv {
  margin: 10px;
}

.btn {
  display: inline-block;
  color: grey;
  font-weight: 700;
  text-decoration: none;
  user-select: none;
  padding: .5em 2em;
  outline: none;
  border: 2px solid;
  border-radius: 1px;
  transition: 0.2s;
  width: 100px;
  align-items: center;

} 

.btn:hover { background: rgba(255,255,255,.2); }
.btn:active { background: white; }

</style>
