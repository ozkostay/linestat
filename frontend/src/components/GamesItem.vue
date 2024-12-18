<template>
  <tr v-if="item.player1">
    <td class="tbl">{{ item.id }}</td>
    <td class="tbl">{{ item.player1.name }}</td>
    <td class="tbl">{{ item.player2.name }}</td>
  </tr>
</template>

<script>
export default {
  name: "GamesItem",
  props: ["item"],
  data() {
    return {
      testItem: "ITEM-GAME",
    };
  },
  methods: {
    onQuery() {
      // this.gamesStore.getGames();
      // console.log("onQuery === =", this.games);
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
