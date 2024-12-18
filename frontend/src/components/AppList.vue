<template>
  <div>
    <ul>
      <li v-for="item in 5" :key="item">
        <slot :iter="item"></slot>  
      </li>
      
    </ul>
  </div>
</template>

<script>
  export default {
    name: "AppList",

  }
</script>

<style lang="scss" scoped>

</style>