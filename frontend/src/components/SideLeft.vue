<template>
  <div class="side-wrap">
    <div class="sb-btn" @click="sb_btn_click()">Страница 1</div>
    <div class="sb-btn" @click="sb_btn_click2()">Страница 2</div>
  </div>
</template>

<script>
export default {
  name: "SideLeft",
  props: {
    msg: String,
  },
  methods: {
    sb_btn_click() {
      console.log("sb_btn_click === ");
      this.$router.push({
        path: "/pageone",
      });
    },

    sb_btn_click2() {
      console.log("sb_btn_click === ");
      this.$router.push({
        path: "/pagetwo",
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-wrap {
  border: 1px solid red;
  min-width: 250px;
  padding: 10px;
}

.sb-btn {
  padding: 10px;
  border: 1px solid red;
  margin: 10px;
  background-color: bisque;
  cursor: pointer;
}
</style>
