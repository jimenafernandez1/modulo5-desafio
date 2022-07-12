import { getImg } from "../../img/index";
import { state } from "../../state";

export function playingPage(params) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="content">

    <div class="reintentar" style="display: none;">
      <text-comp>¡NO ELEGISTE TU JUGADA!</text-comp>
      <button-comp class="again-button">Intentar de nuevo</button-comp>
      <button-comp class="return-button">Ir al inicio</button-comp>
    </div>

    <div class="result-container" style="display: none; width: 140px;">
      <div class="result-content">
        <result-comp></result-comp>
      </div>
    </div>

    <div class="counter"></div>

    <div class="container-hands">

      <div class="container-tijera">
        <tijera-comp class="hand"></tijera-comp>
      </div>
      <div class="container-piedra">
        <piedra-comp class="hand"></piedra-comp>
      </div>
      <div class="container-papel">
        <papel-comp class="hand"></papel-comp>
      </div>

    </div>

    </div>
  `;

  div.className = "playing";
  const style = document.createElement("style");
  
  /// Agregar estilos e imágenes ///
  function addImg(params) {
    const fondo = params.fondo
    style.innerHTML =`
    body{
      background-image: url(${fondo});
    }
    .playing{
      max-height: 100vh;
      display: flex;
      justify-content: center;
      content-visibility: auto;
    }
    .reintentar{
      width: 322px;
      height: 100vh;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      gap: 30px;
    }
    .result-container{
      margin: 0 auto;
    }
    .result-content{
      width: 90px;
    }
    .counter{
      font-family: 'Odibee Sans', cursive;
      font-size: 100px;
      font-weight: 700;

      height: 197px;
      width: 197px;
      background: #E76AFA;
      border-radius: 50%;
      border: 23px solid #000000;

      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      margin-top: 125px;
      margin-bottom: 116px;
    }
    .container-hands{
      display: flex;
      gap: 13px;
    }
    .container-tijera,
    .container-piedra {
      width: 90px;
    }
    .container-papel{
      width: 110px;
    }
    `
  };
  
  getImg().then(function (imgs) {
    addImg(imgs);
  });

  div.appendChild(style);
  
  /// player move ///
  const tijera = div.querySelector(".container-tijera") as any;
  const piedra = div.querySelector(".container-piedra") as any;
  const papel = div.querySelector(".container-papel") as any;
  
  tijera.addEventListener("click", () => {
    const jugada = state.setMove("tijera");
    state.pushToHistory({ ...jugada });
    const currentGame = state.getState().currentGame;
    state.setState(currentGame);
    tijera.style.pointerEvents = "none";
    piedra.style.pointerEvents = "none";
    papel.style.pointerEvents = "none";
    
    /// animaciones ///
    tijera.style.transform = "translateY(-16px)";
    tijera.style.filter = "opacity(1)";
    piedra.style.transform = "translateY(50px)";
    piedra.style.filter = "opacity(0.5)";
    papel.style.transform = "translateY(50px)";
    papel.style.filter = "opacity(0.5)";
  })
  piedra.addEventListener("click", () => {
    const jugada = state.setMove("piedra");
    state.pushToHistory({ ...jugada });
    const currentGame = state.getState().currentGame;
    state.setState(currentGame);
    tijera.style.pointerEvents = "none";
    piedra.style.pointerEvents = "none";
    papel.style.pointerEvents = "none";
    
    /// animaciones ///
    tijera.style.transform = "translateY(50px)";
    tijera.style.filter = "opacity(0.5)";
    piedra.style.transform = "translateY(-14px)";
    piedra.style.filter = "opacity(1)";
    papel.style.transform = "translateY(50px)";
    papel.style.filter = "opacity(0.5)";
  })
  papel.addEventListener("click", () => {
    const jugada = state.setMove("papel");
    state.pushToHistory({ ...jugada });
    const currentGame = state.getState().currentGame;
    state.setState(currentGame);
    tijera.style.pointerEvents = "none";
    piedra.style.pointerEvents = "none";
    papel.style.pointerEvents = "none";
    
    /// animaciones ///
    tijera.style.transform = "translateY(50px)";
    tijera.style.filter = "opacity(0.5)";
    piedra.style.transform = "translateY(50px)";
    piedra.style.filter = "opacity(0.5)";
    papel.style.transform = "translateY(-16px)";
    papel.style.filter = "opacity(1)";
  })

  /// Counter ///
  let counter = 3;
  const reintentarEl = div.querySelector(".reintentar") as any;
  const resultContainerEl = div.querySelector(".result-container") as any;
  const counterEl = div.querySelector(".counter") as any;
  counterEl.textContent = counter;
  
  setTimeout(() => {
    const intervalId = setInterval(() => {
      counterEl.textContent = counter;
      counter--;
      if (counter == -1) {
        const currentGame = state.getState().currentGame;
        clearInterval(intervalId);
        if (currentGame.myPlay == "") {
          reintentarEl.style.display = "flex";
        } else {
          resultContainerEl.style.display = "flex";
          setTimeout(() => {
            params.goTo("/results");
          }, 2000)
        };
      };
    }, 1000)
  }, 400)

  /// Sección reintentar ///
  const againButton = div.querySelector(".again-button") as any;
  const returnButton = div.querySelector(".return-button") as any;

  againButton.addEventListener("click", () => {
    params.goTo("/playing");
  })
  returnButton.addEventListener("click", () => {
    params.goTo("/home");
  })
  return div;
}