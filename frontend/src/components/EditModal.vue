<template>
  <div class="dialog" v-if="props.show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
      <button @click="closeModal">Закрыть</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    show: Boolean, // Указываем тип Boolean
  });

const emit = defineEmits(['close']);
const closeModal = () => {
  emit('close');
};
// import { useGamesStore } from "@/stores/GamesStore";
// import GamesItem from "./GamesItem.vue";
// import { storeToRefs } from "pinia";

// const gamesStore = useGamesStore();
// const { games } = storeToRefs(gamesStore); // Для реактивного доступа к games

// const onAction = (id, action) => {
//   if (action === "delete") {
//     gamesStore.toggleDelete(id);
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
</style>
