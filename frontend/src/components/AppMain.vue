<template>
  <div class="main-wrap">
    <!-- <h3>This is Main</h3> -->
    <!-- <router-view></router-view> -->
     <h3>Main</h3>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrap {
  border: 1px solid red;
  width: 100%;
}
</style>
