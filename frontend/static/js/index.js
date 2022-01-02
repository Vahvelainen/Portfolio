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
  
  //Load & render content
  $("#app").load(await view.getHtml(), function() {
    render();
  });

};

//Not sure if want to keep this here 
const render = () => {
  includeHTML();
  //future reder stuff here
}

const includeHTML = () => {
  var elmts = $("[include-html]")
  elmts.each(function() {
    $(this).load($(this).attr("include-html"), function() {
      includeHTML();
    });
  });
  elmts.removeAttr("include-html");
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