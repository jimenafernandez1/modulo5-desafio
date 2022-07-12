import { getImg } from "../../img/index";

export function instructionsPage(params) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="img-container">
      <img class="img" src="">
    </div>
    <button-comp class="button">¡Jugar!</button-comp>
    <div class="container-hands">
      <tijera-comp class="hand"></tijera-comp>
      <piedra-comp class="hand"></piedra-comp>
      <papel-comp class="hand"></papel-comp>
    </div>
  `;
  div.className = "instructions";
  const style = document.createElement("style");

  /// Agregar estilos e imágenes ///
  function addImg(params) {
    const imgEl: any = div.querySelector(".img");
    imgEl!.src = params.instructions;
    const fondo = params.fondo
    style.innerHTML =`
    body{
      background-image: url(${fondo});
    }
    .instructions{
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
      width: 317px;
      height: auto;
      margin-top: 145px;
      margin-bottom: 45px;
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
    params.goTo("/playing");
  })
  
  div.appendChild(style);
  return div;
}