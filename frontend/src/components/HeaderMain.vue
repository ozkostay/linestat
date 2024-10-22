<template>
  <div class="header-wrap">
   <h3>This is header</h3>
  </div>
</template>

<script>
export default {
  name: 'HeaderMain',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.header-wrap {
  border: 1px solid red;
}
</style>
