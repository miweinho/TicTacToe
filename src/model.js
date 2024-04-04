class GameBoard {
  constructor() {
    this.tiles = Array(9)
      .fill(null)
      .map((_, index) => this.tileFactory(index, `${index + 1}`));
    this.players = [
      { id: 1, name: "", symbol: "X" },
      { id: 2, name: "", symbol: "O" },
    ];
    this.inputField = "";
    this.outputField = "";
    this.currentPlayer = 1;
    this.game_init();
    this.isSetup = false;
  }

  startGame(player1, player2) {
    console.log("startGame");
    console.log(player1, player2);
    this.setPlayerName(1, player1);
    this.setPlayerName(2, player2);
    this.isSetup = true;
    this.printTurnMassage();
  }

  resetGame() {
    this.tiles = Array(9)
      .fill(null)
      .map((_, index) => this.tileFactory(index, `${index + 1}`));
    this.players = [
      { id: 1, name: "", symbol: "X" },
      { id: 2, name: "", symbol: "O" },
    ];
    this.inputField = "";
    this.outputField = "";
    this.game_init();
  }

  make_move() {
    while (this.isTurnPossible(this.inputField - 1)) {
      this.inputField = prompt(
        this.outputField + " Bitte wählen Sie ein Feld aus (1-9):"
      );
    }
    this.setTileValue(
      this.inputField - 1,
      this.getPlayerSymbol(this.currentPlayer)
    );

    if (this.getWinner() === "draw") {
      alert("Unentschieden!");
    } else if (this.getWinner() === "X" || this.getWinner() === "O") {
      alert(
        "Spieler " +
          this.getPlayerBySymbol(this.getWinner()).name +
          " hat gewonnen!"
      );
    } else {
      this.swapPlayer();
      this.printTurnMassage();
    }
  }

  printTurnMassage() {
    this.outputField =
      `Spieler${this.currentPlayer}: ` +
      this.getPlayerName(this.currentPlayer) +
      " ist dran!";
  }

  swapPlayer() {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }

  tileFactory(id, value) {
    return { id, value };
  }

  setTileValue(tileId, value) {
    this.tiles[tileId].value = value;
  }

  getTileValue(tileId) {
    return this.tiles[tileId].value;
  }

  getTiles() {
    return this.tiles;
  }

  getTileValueArray() {
    return this.tiles.map((tile) => tile.value);
  }

  setPlayerName(playerId, name) {
    this.players[playerId - 1].name = name;
  }

  getPlayerName(playerId) {
    return this.players[playerId - 1].name;
  }

  getPlayerSymbol(playerId) {
    return this.players[playerId - 1].symbol;
  }

  getPlayerBySymbol(symbol) {
    return this.players.find((player) => player.symbol === symbol);
  }

  getWinner() {
    //Vertikal
    for (let i = 0; i < 3; i++) {
      if (
        this.getTileValue(i) === this.getTileValue(i + 3) &&
        this.getTileValue(i) === this.getTileValue(i + 6)
      ) {
        return this.getTileValue(i);
      }
    }

    //Horizontal
    for (let i = 0; i < 9; i += 3) {
      if (
        this.getTileValue(i) === this.getTileValue(i + 1) &&
        this.getTileValue(i) === this.getTileValue(i + 2)
      ) {
        return this.getTileValue(i);
      }
    }

    //Diagonal
    if (
      this.getTileValue(0) === this.getTileValue(4) &&
      this.getTileValue(0) === this.getTileValue(8)
    ) {
      return this.getTileValue(0);
    }
    if (
      this.getTileValue(2) === this.getTileValue(4) &&
      this.getTileValue(2) === this.getTileValue(6)
    ) {
      return this.getTileValue(2);
    }
    if (this.isDraw()) {
      return "draw";
    }
    return null;
  }

  isTurnPossible(tileId) {
    if (
      this.getTileValue(tileId) === "X" ||
      this.getTileValue(tileId) === "O"
    ) {
      return false;
    } else {
      return true;
    }
  }

  isDraw() {
    return this.getTiles().every(
      (tile) => tile.value === "X" || tile.value === "O"
    );
  }

  game_init() {
    this.outputField = "Willkommen bei Tic Tac Toe!";
  }
}

export default GameBoard;
