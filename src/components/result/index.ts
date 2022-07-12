import { state } from "../../state";

customElements.define(
  "result-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super()
      this.shadow = this.attachShadow({ mode: "open" });
      this.render()
    }
    render() {
      const container = document.createElement("section");
      const divComputer = document.createElement("div");
      const divPlayer = document.createElement("div");
      const style = document.createElement("style");

      state.subscribe(() => {
        const currentGame = state.getState().currentGame;
        const myPlay = currentGame.myPlay;
        const computerPlay = currentGame.computerPlay

        /// myPlay ///
        if (myPlay == "tijera") {
          divPlayer.innerHTML = `<tijera-comp></tijera-comp>`;
        }
        if (myPlay == "piedra") {
          divPlayer.innerHTML = `<piedra-comp></piedra-comp>`;
        }
        if (myPlay == "papel") {
          divPlayer.innerHTML = `<papel-comp></papel-comp>`;
          divPlayer.style.width = "140px";
        }

        /// computerPlay ///
        if (computerPlay == "tijera") {
          divComputer.innerHTML = `<tijera-comp></tijera-comp>`;
          divComputer.style.transform = "rotate(180deg)";
        }
        if (computerPlay == "piedra") {
          divComputer.innerHTML = `<piedra-comp></piedra-comp>`;
          divComputer.style.transform = "rotate(180deg)";
        }
        if (computerPlay == "papel") {
          divComputer.innerHTML = `<papel-comp></papel-comp>`;
          divComputer.style.width = "140px";
          divComputer.style.transform = "rotate(180deg)";
        }
      });

      style.innerHTML = `
        section{
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        div{
          width: 120px;
        }
      `
      container.appendChild(divComputer);
      container.appendChild(divPlayer);
      this.shadow.appendChild(style);
      this.shadow.appendChild(container);
    }
})