<template>
  <div class="tbl-row">
    <div class="odd">
      <div class="player1" :style="{ color: textColor1 }">
        {{ item.player1.name }}
      </div>

      <div class="player2" :style="{ color: textColor2 }">
        {{ item.player2.name }}
      </div>
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
    <div class="even" :style="{ backgroundColor: kefsColor.win1_odds }">
      {{ item.line[0].win1_odds }}
    </div>
    <div class="even" :style="{ backgroundColor: kefsColor.draw_odds }">
      {{ item.line[0].draw_odds }}
    </div>
    <div class="even" :style="{ backgroundColor: kefsColor.win2_odds }">
      {{ item.line[0].win2_odds }}
    </div>
    <div class="blank"></div>
    <div class="even" :style="{ backgroundColor: kefsColor.double_1x_odds }">
      {{ item.line[0].double_1x_odds }}
    </div>
    <div class="even" :style="{ backgroundColor: kefsColor.double_12_odds }">
      {{ item.line[0].double_12_odds }}
    </div>
    <div class="even" :style="{ backgroundColor: kefsColor.double_x2_odds }">
      {{ item.line[0].double_x2_odds }}
    </div>
    <div class="blank"></div>
    <div class="even bisque">{{ item.line[0].handicap1_value }}</div>
    <div class="even" :style="{ backgroundColor: kefsColor.handicap1_odds }">
      {{ item.line[0].handicap1_odds }}
    </div>
    <div class="even bisque">{{ item.line[0].handicap2_value }}</div>
    <div class="even" :style="{ backgroundColor: kefsColor.handicap2_odds }">
      {{ item.line[0].handicap2_odds }}
    </div>
    <div class="blank"></div>
    <div class="even bisque">{{ item.line[0].total_value }}</div>
    <div class="even" :style="{ backgroundColor: kefsColor.total_under_odds }">{{ item.line[0].total_under_odds }}</div>
    <div class="even" :style="{ backgroundColor: kefsColor.total_over_odds }">{{ item.line[0].total_over_odds }}</div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useGamesStore } from "@/stores/GamesStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  item: {},
});

const gamesStore = useGamesStore();
const { curentPlayer } = storeToRefs(gamesStore); // Для реактивного доступа к games

const textColor1 = computed(() => {
  if (!props.item.result) {
    return "grey";
  }
  if (props.item.player1.id === curentPlayer.value.id) {
    const result = props.item.result.split("(")[0].trim();
    const [result1, result2] = result.split(":");
    if (Number(result1) > Number(result2)) {
      return "green";
    } else if (Number(result1) < Number(result2)) {
      return "red";
    }
    return "blue";
  } else {
    return "#444";
  }
});

const textColor2 = computed(() => {
  if (!props.item.result) {
    return "grey";
  }
  if (props.item.player2.id === curentPlayer.value.id) {
    const result = props.item.result.split("(")[0].trim();
    const [result1, result2] = result.split(":");
    if (Number(result1) < Number(result2)) {
      return "green";
    } else if (Number(result1) > Number(result2)) {
      return "red";
    }
    return "blue";
  } else {
    return "#444";
  }
});

const kefsColor = computed(() => {
  const colors = {
    win1_odds: "white",
    draw_odds: "white",
    win2_odds: "white",
    double_1x_odds: "white",
    double_12_odds: "white",
    double_x2_odds: "white",
    handicap1_odds: "white",
    handicap2_odds: "white",
    total_under_odds: "white",
    total_over_odds: "white",
  };

  if (props.item.result !== null) {
    const result = props.item.result.split("(")[0].trim();
    const [result1, result2] = result.split(":");
    const result1Num = Number(result1);
    const result2Num = Number(result2);
    colors.win1_odds = "pink";
    colors.draw_odds = "pink";
    colors.win2_odds = "pink";
    colors.double_1x_odds = "PaleGreen";
    colors.double_12_odds = "PaleGreen";
    colors.double_x2_odds = "PaleGreen";
    colors.handicap1_odds = "#99ccff";
    colors.handicap2_odds = "#99ccff";
    colors.total_under_odds = "#99ccff";
    colors.total_over_odds = "#99ccff";

    if (result1 > result2) {
      colors.win1_odds = "PaleGreen";
      colors.double_x2_odds = "pink";
    } else if (result1 < result2) {
      colors.win2_odds = "PaleGreen";
      colors.double_1x_odds = "pink";
    } else {
      colors.draw_odds = "PaleGreen";
      colors.double_12_odds = "pink";
    }

    const difference1 =
      result1Num - result2Num + props.item.line[0].handicap1_value;
    const difference2 =
      result2Num - result1Num + props.item.line[0].handicap2_value;

    if (difference1 > 0) {
      colors.handicap1_odds = "PaleGreen";
    } else if (difference1 < 0) {
      colors.handicap1_odds = "pink";
    } else {
      // empty
    }

    if (difference2 > 0) {
      colors.handicap2_odds = "PaleGreen";
    } else if (difference2 < 0) {
      colors.handicap2_odds = "pink";
    } else {
      // empty
    }

    const total = result1Num + result2Num;
    if (total >  props.item.line[0].total_value) {
      colors.total_under_odds = "pink";
      colors.total_over_odds = "PaleGreen";
    } else if (total < props.item.line[0].total_value) {
      colors.total_under_odds = "PaleGreen";
      colors.total_over_odds = "pink";
    } else {
      // empty
    }
  }
  return colors;
});

// console.log("222", props.item.player1.name, curentPlayer.value.name_ru);
</script>

<style scoped>
.odd {
  padding: 3px;
  margin-top: 1%;
  background-color: bisque;
  text-align: left;
  display: flex;
  justify-content: space-between;
  min-width: 390px;
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
  padding: 0;
  min-width: 20px;
  background-color: white;
}
.tbl-row {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.player1 {
  padding-left: 7px;
  font-weight: 700;
}
.player2 {
  padding-right: 7px;
  font-weight: 700;
  text-align: right;
}
.bisque {
  background-color: bisque;
}
.title {
  height: 20px;
  font-weight: 700;
  font-size: 0.8em;
  color: white;
  background-color: chocolate;
}
/* .color-green {
  color: green;
} */
</style>
