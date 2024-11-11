<template>
  <div class="one-wrap">
    Page One
  </div>
</template>

<script>
export default {
  name: "PageOne",
  props: {
    msg: String,
  },
  methods: {
    sb_btn_click() {
    console.log('sb_btn_click === =')
  }
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.one-wrap {
  border: 1px solid red;
  width: 100%;
  padding: 10px;}

  .sb-btn {
  padding: 10px;
  border: 1px solid red;
  margin: 10px;
  background-color: bisque;
  cursor: pointer;
}

</style>
