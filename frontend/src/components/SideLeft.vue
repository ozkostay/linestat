<template>
  <div class="side-wrap">
    <h3>This is Side</h3>
  </div>
</template>

<script>
export default {
  name: "SideLeft",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-wrap {
  border: 1px solid red;
  min-width: 250px;
}
</style>
