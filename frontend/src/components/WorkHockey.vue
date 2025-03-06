<template>
    <tr v-if="item.player1" @click="childEmit(item)">
      <td class="tbl">{{ item.id }}</td>
      <td class="tbl">{{ new Date(item.timestamp).toLocaleDateString() }}</td>
      <td class="tbl">{{ item.player1.name }}</td>
      <td class="tbl">{{ item.player2.name }}</td>
      <!-- <td class="tbl">{{ item.player1 }}</td>
      <td class="tbl">{{ item.player2 }}</td> -->
      <td class="tbl">{{ item.turnament.name }} ({{ item.turnament.id }})</td>
      <!-- <td class="tbl">{{ item.turnament }}</td> -->
      <td class="tbl">{{ item.result }}</td>
      
    </tr>
  </template>
  
  <script>
  export default {
    name: "WorkHockey",
    props: ["item"],
    data() {
      return {
        testItem: "ITEM-GAME",
        tdAction: null,
      };
    },
    methods: {
      onQuery() {
        // this.gamesStore.getGames();
        // console.log("onQuery === =", this.games);
      },
      childEmit(item) {
        // console.log(item.id, this.tdAction);
        this.$emit("action", item, this.tdAction);
        this.tdAction = null;
      },
  
   
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .one-wrap {
    border: 1px solid red;
    width: 100%;
    padding: 10px;
  }
  
  .sb-btn {
    padding: 10px;
    border: 1px solid red;
    margin: 10px;
    background-color: bisque;
    cursor: pointer;
  }
  .tbl {
    border: 1px solid black;
    padding: 3px;
  }
  </style>
  