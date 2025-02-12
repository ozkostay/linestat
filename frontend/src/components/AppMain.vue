<template>
  <div class="main-wrap">
    <!-- <side-left-admin/> -->
    <app-work />
  </div>
</template>

<script>
// import SideLeftAdmin from './SideLeftAdmin.vue';
import AppWork from "./AppWork.vue";

export default {
  name: "AppMain",
  data() {
    return {};
  },
  components: {
    // "side-left-admin": SideLeftAdmin,
    AppWork,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrap {
  border: 1px solid red;
  width: 100%;
  display: flex;
}

.card {
  border: 1px solid blue;
  margin: 10px;
  padding: 10px;
  background-color: bisque;
}
</style>
