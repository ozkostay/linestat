<template>
  <div class="main-wrap">
    <h3>Main</h3>
    Открыто: {{countOpen}}
    <app-news
      v-for="item in news"
      :key="item.id"
      :title="item.title"
      :id="item.id"
      :is-open="item.isOpen"
      v-on:open-news="countOpen++"
    ></app-news>
        
    <app-slots>
      <template #:second>
        <div>Second slot</div>
      </template>
      Childe in slots
    </app-slots>

    <app-list>
      <template #default="slotProps">
        <span style="color: #c25205;">{{slotProps.iter}}</span>
      </template>  
    </app-list>


  </div>
</template>

<script>
import AppNews from "./AppNews.vue";
import AppSlots from "./AppSlots.vue";
import AppList from "./AppList.vue";
export default {
  name: "AppMain",
  data() {
    return {
      countOpen: 0,
      news: [
        {
          id: 1,
          title: "News One",
          isOpen: false,
        },
        {
          id: 2,
          title: "News Two",
          isOpen: true,
        },
      ],
    };
  },
  components: {
    "app-news": AppNews,
    "app-slots": AppSlots,
    "app-list": AppList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrap {
  border: 1px solid red;
  width: 100%;
}

.card {
  border: 1px solid blue;
  margin: 10px;
  padding: 10px;
  background-color: bisque;
}
</style>

