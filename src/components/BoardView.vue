<template>
  <v-container>
    <v-row>
      <v-col class="bg-red">
        <h1>{{ outputField }}</h1>
      </v-col>
    </v-row>
    <v-row v-if="gameStarted" class="d-flex">
      <v-col cols="4" v-for="n in tiles" :key="n.id" class="bg-blue">
        <p class="text-center">{{ n.value }}</p>
      </v-col>
    </v-row>
    <v-row v-if="gameStarted">
      <v-input>
        <v-text-field v-model="inputField"> </v-text-field>
        <v-btn @click="makeMove">Mache Zug</v-btn>

        <v-btn @click="resetGame">Reset</v-btn>
      </v-input>
    </v-row>
    <v-row v-if="!gameStarted">
      <v-col>
        <v-text-field
          v-model="player1"
          label="Geben Sie den Namen für Spieler 1 ein:"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="!gameStarted">
      <v-col>
        <v-text-field
          v-model="player2"
          label="Geben Sie den Namen für Spieler 2 ein:"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="!gameStarted">
      <v-btn @click="startGame">Start Game!</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const outputField = ref("Welcome to Tic Tac Toe");
const currentPlayer = ref(1);
const player1 = ref("");
const player2 = ref("");
const gameStarted = ref(false);

const inputField = ref("");

const tiles = ref([
  { id: 1, value: "1" },
  { id: 2, value: "2" },
  { id: 3, value: "3" },
  { id: 4, value: "4" },
  { id: 5, value: "5" },
  { id: 6, value: "6" },
  { id: 7, value: "7" },
  { id: 8, value: "8" },
  { id: 9, value: "9" },
]);

const players = ref({
  player1: { id: 1, name: "", symbol: "X" },
  player2: { id: 2, name: "", symbol: "O" },
});

function resetGame() {
  tiles.value.forEach((tile) => {
    tile.value = tile.id;
  });
  players.value.player1.name = "";
  players.value.player2.name = "";
  player1.value = "";
  player2.value = "";
  outputField.value = "Welcome to Tic Tac Toe";
  gameStarted.value = false;
}

function setPlayerNames(player1, player2) {
  players.value.player1.name = player1;
  players.value.player2.name = player2;
}

function isViableTurn(tile) {
  return getTileById(tile).value !== "X" && getTileById(tile).value !== "O";
}

function printCurrentTurn() {
  outputField.value = `It's ${
    currentPlayer.value === 1
      ? players.value.player1.name
      : players.value.player2.name
  }'s turn`;
}

function getTileById(id) {
  return tiles.value.find((tile) => tile.id === parseInt(id));
}

function getPlayerById(id) {
  return id === 1 ? players.value.player1 : players.value.player2;
}

function isDraw() {
  return tiles.value.every((tile) => tile.value === "X" || tile.value === "O");
}

function makeMove() {
  if (isViableTurn(inputField.value)) {
    getTileById(inputField.value).value = getPlayerById(
      currentPlayer.value
    ).symbol;
    currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
    printCurrentTurn();
  } else {
    outputField.value = `Das Feld ist besetzt. ${
      getPlayerById(currentPlayer.value).name
    } ist am Zug.`;
  }
  if (getWinner() === "draw") {
    outputField.value = "It is a draw!";
  } else if (getWinner()) {
    outputField.value = `${getPlayerById(currentPlayer.value).name} has won!`;
  }
  inputField.value = "";
}

function getWinner() {
  //Vertical
  for (let i = 0; i < 3; i++) {
    if (
      tiles.value[i].value === tiles.value[i + 3].value &&
      tiles.value[i].value === tiles.value[i + 6].value
    ) {
      return tiles.value[i].value;
    }
  }

  //Horizontal
  for (let i = 0; i < 9; i += 3) {
    if (
      tiles.value[i].value === tiles.value[i + 1].value &&
      tiles.value[i].value === tiles.value[i + 2].value
    ) {
      return tiles.value[i].value;
    }
  }

  //Diagonal
  if (
    tiles.value[0].value === tiles.value[4].value &&
    tiles.value[0].value === tiles.value[8].value
  ) {
    return tiles.value[0].value;
  }
  if (
    tiles.value[2].value === tiles.value[4].value &&
    tiles.value[2].value === tiles.value[6].value
  ) {
    return tiles.value[2].value;
  }

  if (isDraw()) {
    return "draw";
  }

  return null;
}

function startGame() {
  setPlayerNames(player1.value, player2.value);
  printCurrentTurn();
  gameStarted.value = true;
}
</script>
