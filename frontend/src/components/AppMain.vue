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
  </div>
</template>

<script>
import AppNews from "./AppNews.vue";
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

