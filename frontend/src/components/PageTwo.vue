<template>
  <div>
    Page Two
  </div>
</template>

<script>
export default {
  name: "PageTwo",
  props: {
    msg: String,
  },
  methods: {
    sb_btn_click() {
    console.log('sb_btn_click === ')
  }
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.side-wrap {
  border: 1px solid red;
  min-width: 250px;
  padding: 10px;}

  .sb-btn {
  padding: 10px;
  border: 1px solid red;
  margin: 10px;
  background-color: bisque;
  cursor: pointer;
}

</style>
