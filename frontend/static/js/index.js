const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("Viewing Dashboard") },
    { path: "/work", view: () => console.log("Viewing Work") },
    { path: "/bio", view: () => console.log("Viewing Bio") },
    { path: "/history", view: () => console.log("Viewing History") }
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

  match.route.view();
};

document.addEventListener("DOMContentLoaded", () => {
  router();
});