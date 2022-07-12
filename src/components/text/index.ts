customElements.define(
  "text-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    tags: string[] = ["h2", "h3", "p"];
    tag: string = "p";
    constructor() {
      super()
      this.shadow = this.attachShadow({ mode: "open" })
      if (this.tags.includes(this.getAttribute("tag") as string)) {
        this.tag = this.getAttribute("tag") || this.tag;
      }
      this.render()
    }
    render() {
      const rootEl = document.createElement(this.tag);
      rootEl.textContent = this.textContent;

      const style = document.createElement("style");
      style.innerHTML = `
        *{
          margin: 0;
          font-family: 'Odibee Sans', cursive;
          font-weight: 400;
        }
        h2{
          font-size: 55px;
        }
        h3{
          font-size: 45px;
          letter-spacing: 0.05em;
        }
        p{
          font-size: 40px;
        }
      `;

      this.shadow.appendChild(style);
      this.shadow.appendChild(rootEl);
    }
  })