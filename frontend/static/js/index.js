import Dashboard from "./views/Dashboard.js";
import Work from "./views/Work.js";
import Bio from "./views/Bio.js";
import History from "./views/History.js";

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/work", view: Work },
    { path: "/bio", view: Bio },
    { path: "/history", view: History }
  ];
  
  // Test each route for potential match
  const potentialMatches = routes.map( route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    };
  });
  
  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
  
  //Default to dashboard if no match
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    };
  };
  
  const view = new match.route.view();
  
  //Load view content
  document.querySelector("#app").innerHTML = await view.getHtml();
  
};

//Browser history navigation
const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});