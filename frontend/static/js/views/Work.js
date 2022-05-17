import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Work by Leevi Vahvelainen');
  }
  
  async getHtml() {
    $('#app').attr('class', 'work');
    return '/static/views/Work.html';
  }
}

export function loadArticles () {
  const elmnts = $('[load-article]')
  elmnts.each(function () {
    const elmnt = $(this);
    $.get(elmnt.attr('load-article'), function(data) {
      let media;
      const mediaType = urlFileExtension(data.media);
      if ( mediaType === 'jpg' || mediaType === 'png' ) {
        media = $('<img></img>').attr('src', data.media);
        media.attr('data-fancybox', 'wrk');
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
      if (data.full_page) {
        const readMore = $('<a>Read More</a>').attr('href', data.full_page);
        textDivider.append(readMore); 
      }
      elmnt.append(media, textDivider);
      setWorkFunctions();
    });
  });
  elmnts.removeAttr('load-article');
};

function setWorkFunctions() {
  setClickTrough();
  setSquare();
}

function urlFileExtension(url) {
  return url.substring(url.lastIndexOf('.')+1, url.length) || url;
};

//
function setClickTrough() {
  $('[click-trough]').each( function () {
    $(this).click(
      $(this).parents().find('a').click()
    )
  });
};

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

function setOnScrollClass() {
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

window.addEventListener('resize', setSquare);
function setSquare() { 
  //css is so powerfull right they said
  $('.square').each( function () {
    $(this).height($(this).width());
  });
};