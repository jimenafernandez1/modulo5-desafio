import { getImg } from "../../img/index";

customElements.define(
  "papel-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super()
      this.shadow = this.attachShadow({ mode: "open" })
      
      this.render()
    }
    render() {
      const div = document.createElement("div")
      div.innerHTML = `
        <img class="img" src="">
      `
      /// Agregar src ///
      function addImg(params) {
        const imgEl: any = div.querySelector(".img");
        imgEl!.src = params.papel;
      }

      getImg().then(function (imgs) {
        addImg(imgs);
      })

      const style = document.createElement("style");
      style.innerHTML = `
      .img{
        width: 100%;
        height: auto;
      }
      `;

      /// Apendear ///
      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  })