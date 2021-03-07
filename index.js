const api = new API();
let Active
function processmovies(obj) {
  // console.log(obj);
  // const tabControls = document.querySelector('#myTab')
  const divhold = document.createElement('div');
  divhold.classList.add('moviebody')
  const alt = document.createElement('div');
  alt.classList.add('tvsbody')
  console.log(Active)
  if(Active === 'tv-tab') {
    obj.forEach((multi) => {
      if(multi.media_type === "tv") {
        showstv.innerHTML = ''
        let movieMedia = Render.renderMedia(multi)
        Renderer.renderHoverState(movieMedia, multi)
        alt.append(movieMedia)
        tv.append(alt);
      }})
  }else if(Active === 'movies-tab') {
    obj.forEach((multi) => {
      if(multi.media_type !== "tv") {
        movies.innerHTML = ''
      let movieMedia = Render.renderMedia(multi)
      Renderer.renderHoverState(movieMedia, multi)
      divhold.append(movieMedia)
      movies.append(divhold);
      }
    })
  }

}

document.addEventListener('mediaClicked', (e) => { Renderer.renderModal(e.detail); });

// function tvpopular(obj) {
//   // console.log(obj)
//   obj.forEach((now) => {
//     populartv.append(Render.renderMedia(now))
//   })
// }
// function intheaters(obj) {
//   obj.forEach((now) => {
//     nowplaying.append(Render.renderMedia(now));
//   });

// }
function tvshowtabs(obj) {
  // console.log(obj);
  const renderedMedia = Render.renderMedia(obj, 'tv-media');
  Renderer.renderHoverState(renderedMedia, obj);
  showstv.append(renderedMedia);

  // showstv
}
let time = 1;
function movieautos(obj) {
  obj.forEach((now) => {
    const movieMedia = Render.renderMedia(now)
    Renderer.renderHoverState(movieMedia, now)
    movieauto.append(movieMedia);
  });
}
function contmovie() {
  const pages = setInterval(() => {
    time++;
    api.automovie(time).then((data) => movieautos(data.results));
  }, 100);
  setTimeout(() => {
    clearInterval(pages);
  }, 600);
}
let tvtime = 1;
function conttv() {
  const page = setInterval(() => {
    tvtime++;
    api.tvshowstab(tvtime).then((data) => resendid(data.results));
    // console.log(tvtime)
  }, 100);
  setTimeout(() => {
    clearInterval(page);
  }, 500);
}

function resendid(obj) {
  console.log(obj)
  obj.forEach((now) => {
    api.network(now.id)
      .then((data) => tvshowtabs(data));
  });
}
function searchHide(input) {
  let tabs = document.getElementById('searchbar')
  // console.log(tabs[0])
  if (input.id === 'movies-tab') {
    Active = 'movies-tab'
    tabs.style.opacity = '1'
    tabs[0].setAttribute("placeholder", "Search Movies")
  }else if (input.id === 'tv-tab') {
    Active = 'tv-tab'
    tabs.style.opacity = '1'
    tabs[0].setAttribute("placeholder", "Search Tv-Shows")
  }else if (input.id === 'watchlist') {
    Active = 'watchlist'
    tabs.style.opacity = '1'
    tabs[0].setAttribute("placeholder", "Search Watchlist")
  }else if(input.id === 'home-tab') {
    tabs.style.opacity = '0'
  }

}
document.addEventListener('DOMContentLoaded', () => {
  api.movie('now_playing').then((data) => renderList(document.getElementById('now-playing'), data.results));
  api.tv('on_the_air').then((data) => renderList(document.getElementById('popular-tv'), data.results));
 //search bar is display none on home screen
  let tabControl = document.getElementById('searchbar')
  tabControl.style.opacity = '0'

  api.tv('popular').then((data) => { resendid(data.results); conttv(); });
  api.automovie(1).then((data) => { movieautos(data.results); contmovie(); });
  
  document.getElementById('myTab').addEventListener('click', (e) => { searchHide(e.target)})
  if (false) {
    document.getElementById('splash-screen').style.display = 'flex';
    splashStartAnimation();
    splashEndAnimation();
  }
  document.getElementById('searchbar').addEventListener('submit', (e) => {
    // movies.innerHTML = '';
    e.preventDefault();
    api.searchAll('multi',e.target[0].value).then((data) => processmovies(data.results));
  });
});
