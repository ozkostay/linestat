<template>
  <div>
    <p>Slot</p>
    <slot></slot>
    <slot name="second">No text in second</slot>
  </div>
</template>

<script>
  export default {
    name: "AooSlots"
    
  }
</script>

<style lang="scss" scoped>

</style>