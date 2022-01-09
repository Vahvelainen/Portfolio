import Dashboard from './views/Dashboard.js';
import Work from './views/Work.js';
import Bio from './views/Bio.js';
import History from './views/History.js';

const router = async () => {
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/work', view: Work },
    { path: '/bio', view: Bio },
    { path: '/history', view: History }
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
  setSquare();
  setClickTrough();
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

const loadArticles = () => {
  const elmnts = $('[load-article]')
  elmnts.each(function () {
    const elmnt = $(this);
    $.get(elmnt.attr('load-article'), function(data) {
      let media;
      const mediaType = urlFileExtension(data.media);
      if ( mediaType === 'jpg' || mediaType === 'png' ) {
        media = $('<img></img>').attr('src', data.media);
      } else if ( mediaType === 'mp4' ) {
        media = $('<video autoplay muted loop></video>').attr('src', data.media);
      } else {
        media = $('<embed></embed>').attr('src', data.media);
      }
      const textDivider = $('<div click-trough></div>');
      const title = $('<h3></h3>').text(data.title);
      textDivider.append(title);
      data.paragraphs.forEach(function (item) {
        const paragraph = $('<p></p>').text(item);
        textDivider.append(paragraph);
      });
      elmnt.append(media, textDivider);
      render();
    });
  });
  elmnts.removeAttr('load-article');
};

const urlFileExtension = url => {
  return url.substring(url.lastIndexOf('.')+1, url.length) || url;
};

const scrollToHashLink = () => {
  const url_string = window.location.href;
  const elemId = url_string.split('#')[1];
  if (elemId){
    $('#'+elemId)[0].scrollIntoView();
  }
};

//Thingies for dashboard .work section

//Scroll follow anti-throthling
let ticking = false;
document.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      setOnScrollClass();
      setTimeout(() => {
        ticking = false;
      }, 80);
    });
    ticking = true;
  }
});

const setOnScrollClass = () => {
  const elemnts = $('section.work > a');
  if (elemnts.length == 0) {
    return;
  }
  const top = elemnts[0].getBoundingClientRect().top;
  const bottom = elemnts[elemnts.length-1].getBoundingClientRect().bottom;
  const height = bottom - top;
  const relativeScroll = - (top - innerHeight / 2 ) / height;
  const i = Math.round( relativeScroll * elemnts.length)
  elemnts.removeClass('on-scroll');
  if ( i >= 0 && i <= elemnts.length - 1 ) {
    elemnts[i].classList.add('on-scroll');
  }
};

const setSquare = () => { 
  //css is so powerfull right they said
  $('.square').each( function () {
    $(this).height($(this).width());
  });
};
window.addEventListener('resize', setSquare);

const setClickTrough = () => {
  $('[click-trough]').each( function () {
    $(this).click(
      $(this).parents().find('a').click()
    )
  });
};

//Browser history navigation
const navigateTo = url => {
  history.pushState(null, null, url);
  router();
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
