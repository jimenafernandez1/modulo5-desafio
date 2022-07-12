import { initRouter } from "./router";
import { state } from "./state";
import "./components/text";
import "./components/button";
import "./components/tijera";
import "./components/piedra";
import "./components/papel";
import "./components/result";

(function () {
  const root = document.querySelector(".root");
  initRouter(root);  
})()