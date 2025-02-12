<template>

    <div class="main-wrap">
        WORK
  
    </div>
  </template>
  
  <script>
    export default {
    name: "AppWork",
    data() {
      return {
        countOpen: 0,
        news: [
          {
            id: 1,
            title: "News One",
            isOpen: false,
          },
          {
            id: 2,
            title: "News Two",
            isOpen: true,
          },
        ],
      };
    },
    components: {
    //   "side-left-admin": SideLeftAdmin
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .main-wrap {
    border: 1px solid red;
    width: 100%;
  }
  
  .card {
    border: 1px solid blue;
    margin: 10px;
    padding: 10px;
    background-color: bisque;
  }
  </style>
  
  