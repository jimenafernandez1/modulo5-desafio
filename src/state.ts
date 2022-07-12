/// tipado ///
type Play = "piedra" | "papel" | "tijera";
type Game = {
  computerPlay: Play,
  myPlay: Play,
};

/// state ///
export const state = {
  data: {
    currentGame: {
      computerPlay: "",
      myPlay: "",
    },
    history: JSON.parse(localStorage.getItem("score")!) || [],
  },
  listeners: [],
  getState() {
    return this.data
  },
  setState(currentGame) {
    this.data.currentGame = currentGame;
    for (const cb of this.listeners) {
      cb(currentGame);
    };
  },
  pushToHistory(play: any) {
    const history = this.data.history;
    history.push(play);
    localStorage.setItem("score", JSON.stringify(history));
  },
  computerPlay() {
    const min = 1;
    const max = 3;
    var move = Math.floor(Math.random() * (max - min + 1) + min);

    if (move == 1) {
      return "piedra"
    } if (move == 2) {
      return "papel"
    } else {
      return "tijera"
    }
  },
  setMove(move: Play) {
    const currentState = this.getState();
    currentState.currentGame.myPlay = move;
    currentState.currentGame.computerPlay = this.computerPlay();
    return currentState.currentGame
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);   
  },
  whoWins(myPlay: Play, computerPlay: Play) {
    const playerWithTijeras: Boolean = myPlay == "tijera" && computerPlay == "papel";
    const playerWithPiedras: Boolean = myPlay == "piedra" && computerPlay == "tijera";
    const playerWithPapel: Boolean = myPlay == "papel" && computerPlay == "piedra";

    const playerWins = [playerWithTijeras, playerWithPiedras, playerWithPapel].includes(true);
    
    const computerWithTijeras: Boolean = myPlay == "tijera" && computerPlay == "piedra";
    const computerWithPiedras: Boolean = myPlay == "piedra" && computerPlay == "papel";
    const computerWithPapel: Boolean = myPlay == "papel" && computerPlay == "tijera";

    const computerWins = [computerWithTijeras, computerWithPiedras, computerWithPapel].includes(true);

    if (playerWins) {
      localStorage.setItem("winner", "player");
      return "playerWins";
    } else if (computerWins) {
      localStorage.setItem("winner", "computer");
      return "computerWins";
    } else {
      localStorage.setItem("winner", "empate");
      return "empate";
    }
  },
  addPoints() {
    const history = this.getState().history; 
    const score = {
      computerPlay: 0,
      myPlay: 0,
    };
    for (const play of history) {
      const winner = this.whoWins(play.myPlay, play.computerPlay);
      if (winner == "playerWins") {
        score.myPlay++;
      }
      if (winner == "computerWins") {
        score.computerPlay++;
      }
    }
    return score;
  },
  getWinner() {
    const score = JSON.parse(localStorage.getItem("score") as any);
    const winner = localStorage.getItem("winner");
    const localData = {
      score: score,
      winner: winner,
    }
    return localData;
  },
}