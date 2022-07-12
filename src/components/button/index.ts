customElements.define(
  "button-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super()
      this.shadow = this.attachShadow({ mode: "open" })
      
      this.render()
    }
    render() {
      this.shadow.innerHTML = `
        <button><text-comp tag="h3">${this.textContent}</text-comp></button>
      `

      const style = document.createElement("style");
      style.innerHTML = `
        button{
          border-radius: 10px;
          border: solid 10px #001997;
          background-color: #006CFC;
          color: #D8FCFC;
          width: 322px;
          height: 87px;
        }
      `;

      this.shadow.appendChild(style);
    }
  })