<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <button @click="open">{{ (isOpen2 ? 'Закрыть ' : 'Открыть ') + id }}</button>
    <p v-if="isOpen2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea architecto
      saepe voluptatibus voluptas fugit, quisquam ipsam temporibus amet minima
      ab ducimus voluptates optio soluta, repellendus ad ipsum blanditiis odit?
      Minima!
    </p>
  </div>
</template>

<script>
export default {
  name: "AppNews",
  data() {
    return {
      isOpen2: this.isOpen
    };
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: Number,   
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  methods: {
    open() {
      this.isOpen2 = !this.isOpen2;
      if(this.isOpen2) {
        this.$emit('open-news');
      }
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  border: 1px solid green;
  margin: 10px;
  padding: 10px;
}
</style>

