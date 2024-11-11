<template>
  <div class="header-wrap">
   <h1>{{ title + ' - ' + now }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HeaderMain',
  data() {
    return {
      title: "Title from data()",
      now: new Date().toLocaleDateString()
    }
  },  
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
