import { getImg } from "../../img/index";

export function homePage(params) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="img-container">
      <img class="img" src="">
    </div>
    <button-comp class="button">Empezar</button-comp>
    <div class="container-hands">
      <tijera-comp class="hand"></tijera-comp>
      <piedra-comp class="hand"></piedra-comp>
      <papel-comp class="hand"></papel-comp>
    </div>
  `;
  div.className = "home";
  const style = document.createElement("style");
  
  /// Agregar estilos e imágenes ///
  function addImg(params) {
    const imgEl: any = div.querySelector(".img");
    imgEl!.src = params.titulo;
    const fondo = params.fondo
    style.innerHTML =`
    * {
      box-sizing: border-box;
    }
    body{
      background-image: url(${fondo});
    }
    .home{
      max-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      content-visibility: auto;
    }
    .img-container{
      display: flex;
      justify-content: center;
    }
    .img{
      width: 284px;
      height: 204px;
      margin-top: 115px;
      margin-bottom: 74px;
    }
    .container-hands{
      display: flex;
      gap: 46px;
      margin-top: 86px;
    }
    `
  }
  
  getImg().then(function (imgs) {
    addImg(imgs);
  })
  
  const button = div.querySelector(".button");
  button?.addEventListener("click", () => {
    params.goTo("/instructions");
  })
  
  div.appendChild(style);
  return div;
}