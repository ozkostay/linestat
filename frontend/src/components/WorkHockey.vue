<template>
  <div class="tbl-row" @click="childEmit(item)">
      <div class="odd players">
      <div>{{ item.player1.name }} - {{ item.player2.name }}</div>
    </div>
    <div class="odd blank bisque"></div>
    <div class="odd score">
      <strong>{{ item.result }}</strong>
    </div>
  </div>
  <div class="tbl-row title">
    <div class="even">1</div>
    <div class="even">x</div>
    <div class="even">2</div>
    <div class="blank"></div>
    <div class="even">1x</div>
    <div class="even">12</div>
    <div class="even">2x</div>
    <div class="blank"></div>
    <div class="even even-double">фора 1</div>
    <div class="even even-double">фора 2</div>
    <div class="blank"></div>
    <div class="even">тотал</div>
    <div class="even">мен</div>
    <div class="even">бол</div>
  </div>
  <div class="tbl-row">
    <div class="even">{{ item.line[0].win1_odds }}</div>
    <div class="even">{{ item.line[0].draw_odds }}</div>
    <div class="even">{{ item.line[0].win2_odds }}</div>
    <div class="blank"></div>
    <div class="even">{{ item.line[0].double_1x_odds }}</div>
    <div class="even">{{ item.line[0].double_12_odds }}</div>
    <div class="even">{{ item.line[0].double_x2_odds }}</div>
    <div class="blank"></div>
    <div class="even bisque">{{ item.line[0].handicap1_value }}</div>
    <div class="even">{{ item.line[0].handicap1_odds }}</div>
    <div class="even bisque">{{ item.line[0].handicap2_value }}</div>
    <div class="even">{{ item.line[0].handicap2_odds }}</div>
    <div class="blank"></div>
    <div class="even bisque">{{ item.line[0].total_value }}</div>
    <div class="even">{{ item.line[0].total_under_odds }}</div>
    <div class="even">{{ item.line[0].total_over_odds }}</div>
  </div>
</template>

<script>
export default {
  name: "WorkHockey",
  props: ["item"],
  data() {
    return {
      // testItem: "ITEM-GAME",
      // tdAction: null,
      bold: "bold",
    };
  },
  methods: {
    // onQuery() {
    //   // this.gamesStore.getGames();
    //   // console.log("onQuery === =", this.games);
    // },
    childEmit(item) {
      console.log(item.id);
      // this.$emit("action", item, this.tdAction);
      // this.tdAction = null;
    },
  },
};
</script>

<style scoped>
.odd {
  padding: 3px;
  margin-top: 1%;
  background-color: bisque;
  text-align: left;
}
.even {
  width: calc(100% / 14);
  border: 1px solid black;
  padding: 3px;
}
.even-double {
  width: calc(100% / 6.5);
}
.blank {
  min-width: 20px;
  background-color: white;
}
.tbl-row {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.players {
  min-width: 300px;
  /* display: flex; */
  padding-left: 20px;
  font-weight: 700;
  /* text-align: center; */
}
.bisque {
  background-color: bisque;
}
.title {
  height: 20px;
  font-weight: 700;
  font-size: 0.8em ;
  color: white;
  background-color:chocolate
}
</style>
