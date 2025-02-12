<template>
  <div class="header-wrap">
  
    <div class="btn-conteiner">
      <button class="header-btn" @click="sideStore.setActiveTab(1)">USER</button>
      <button class="header-btn" @click="sideStore.setActiveTab(2)">ADMIN</button>
    </div>
    <div class="header-title"><h1>{{ title + sideStore.activeTab }}</h1></div>
   
 </div> </template>

<script>
import { useGamesStore } from '@/stores/GamesStore';
import { useSideStore } from '@/stores/SideStore';
export default {
  name: 'HeaderMain',
  data() {
    return {
      title: "Title SideStore=",
      now: new Date().toLocaleDateString(),
      gamesStore: useGamesStore(),
      sideStore: useSideStore(),
    }
  },  
  props: { msg: String },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 10px 0;
}

.header-wrap {
  border: 1px solid red;
  align-content: stretch; 
  display: flex;
}

.btn-conteiner {
  width: 250px;
  display: flex;
  align-items: stretch; /* Растягиваем кнопку по высоте контейнера */
}

.header-btn {
  width: 50%; /* Заполняем всю ширину контейнера */
  height: 100%; /* Заполняем всю высоту контейнера */
  border: none; /* Убираем стандартные границы кнопки */
  padding: 0; /* Убираем стандартные отступы кнопки */
}

.header-title {
  flex-grow: 1;
  border: 1px solid blue;
  height: 50px;
}
</style>
