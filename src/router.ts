import { homePage } from "./pages/home";
import { instructionsPage } from "./pages/instructions";
import { playingPage } from "./pages/playing";
import { resultsPage } from "./pages/results";

const BASE_PATH = "/modulo5-desafio";

const routes = [
  {
    path: /\/home/,
    component: homePage,
  },
  {
    path: /\/instructions/,
    component: instructionsPage,
  },
  {
    path: /\/playing/,
    component: playingPage,
  },
  {
    path: /\/results/,
    component: resultsPage,
  },
]

function isGithubPages() {
  return location.host.includes("github.io");
};

export function initRouter(container: any) {
  function goTo(path) {
    const completePath = isGithubPages() ? BASE_PATH + path : path;
    history.pushState({}, "", completePath);
    handleRoute(completePath);
  }

  function handleRoute(route) {
    const newRoute = isGithubPages() ? route.replace(BASE_PATH, "") : route;
    for (const r of routes) {
      if (r.path.test(newRoute)) {
        const el = r.component({ goTo: goTo })
        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }

  if ( isGithubPages() || location.pathname == "/") {
    goTo("/home");
  } else {
    handleRoute(location.pathname);
  }

  window.onpopstate = function () {
    handleRoute(location.pathname);
  }
}
