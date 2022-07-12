import { getImg } from "../../img/index";
import { state } from "../../state";

export function resultsPage(params) {
  const div = document.createElement("div");
  const style = document.createElement("style");

  const localData = state.addPoints();
  var playerScore = localData.myPlay;
  var computerScore = localData.computerPlay;
  
  div.innerHTML = `
  <div class="results-page">
    <div class="img-container">
      <img class="img" src="">
      <div class="empate" style="display: none;">
        <text-comp tag="h2">EMPATE</text-comp>
      </div>
    </div>

    <div class="score-container">
      <text-comp tag="h2">Score</text-comp>
      <div class="score">
        <text-comp class="player-score" tag="h3">Vos: ${playerScore} </text-comp>
        <text-comp class="computer-score" tag="h3">Máquina: ${computerScore}</text-comp>
      </div>
    </div>

    <button-comp>Volver a Jugar</button-comp>

  </div>
  `;

  /// Agregar estilos e imágenes ///
  function addImg(params) {
    const fondo = params.fondo;
    const imgEl = div.querySelector(".img") as any;
    const empate = div.querySelector(".empate") as any;
    const body = div.querySelector(".results-page") as any;
    
    const localData = state.getWinner();
    if (localData.winner == "player") {
      body.style.backgroundColor = "#888949";
      imgEl.src = params.ganaste;
    }
    if (localData.winner == "computer") {
      imgEl.src = params.perdiste;
      body.style.backgroundColor = "#894949";
    }
    if (localData.winner == "empate") {
      imgEl.style.display = "none";
      empate.style.display = "initial";
    }

    style.innerHTML = `
      *{
        box-sizing: border-box;
      }
      body{
       background-image: url(${fondo});
       background-color: pink;
      }
      .results-page{
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .img{
        width: 254px;
        height: auto;
      }
      .empate{

      }
      .score-container{
        width: 259px;
        height: 217px;
        margin-top: 11px;
        margin-bottom: 21px;
        background-color: #FFFFFF;
        border: 10px solid #000;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .score{
        margin-top: 13px;
        text-align: end;
      }
    `;
  };

  getImg().then(function (imgs) {
    addImg(imgs);
  });

  const button = div.querySelector("button-comp");
  button?.addEventListener("click", () => {
    params.goTo("/playing");
  })

  div.appendChild(style);
  return div;
}