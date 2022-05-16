import Dashboard from './views/Dashboard.js';
import Work,{ loadArticles } from './views/Work.js';
import WorkView from "./views/WorkView.js";
import Bio from './views/Bio.js';
import History from './views/History.js';

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

//Browser history navigation
const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/work', view: Work },
    { path: "/work/:id", view: WorkView },
    { path: '/bio', view: Bio },
    { path: '/history', view: History }
  ];
  
  // Test each route for potential match
  const potentialMatches = routes.map(route => {
    return {
        route: route,
        result: location.pathname.match(pathToRegex(route.path))
    };
  });
  
  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

  //Default to dashboard if no match
  if (!match) {
    match = {
        route: routes[0],
        result: [location.pathname]
    };
  }
  
  const view = new match.route.view(getParams(match));
  
  //Load & render content
  //for the sake of viewer we empty the app before we rip the css out
  $('#app').html('');
  $('#app').load(await view.getHtml(), function() {
    render();
  });
};

//Not sure if want to keep this here 
const render = () => {
  includeHTML();
  loadArticles();
  scrollToHashLink();
  //future render stuff here
}

const includeHTML = () => {
  const elmnts = $('[include-html]')
  elmnts.each(function() {
    $(this).load($(this).attr('include-html'), function() {
      render();
    });
  });
  elmnts.removeAttr('include-html');
};

const scrollToHashLink = () => {
  const url_string = window.location.href;
  const elemId = url_string.split('#')[1];
  if (elemId){
    $('#'+elemId)[0].scrollIntoView();
  }
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
