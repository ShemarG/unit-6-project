const api = new API();
api.active = 'home-tab'
//watchlist 
function watchlist(obj) {
  console.log
}
function processmovies(obj) {
  const moviegridcont = document.getElementById('movie-grid')
  const tvshowcont = document.getElementById('tv-grid')
  if(api.active === 'tv-tab') {
    tvshowcont.innerHTML = ''
    renderList(tvshowcont,obj,'tv')
  }else if(api.active === 'movies-tab') {
        moviegridcont.innerHTML = ''
        renderList(moviegridcont,obj,'movie')
  }

}
function searchHide(input) {
  let tabs = document.getElementById('searchcont')
  let searchopt = document.getElementById('search')[0]

  // console.log(tabs[0])
  if (input.id === 'movies-tab') {
    api.active = 'movies-tab'
    tabs.style.opacity = '1'
    searchopt.disabled = false
    searchopt.setAttribute("placeholder", "Search Movies")
  }else if (input.id === 'tv-tab') {
    api.active = 'tv-tab'
    tabs.style.opacity = '1'
    searchopt.disabled = false
    searchopt.setAttribute("placeholder", "Search Tv-Shows")
  }else if (input.id === 'watchlist') {
    api.active = 'watchlist'
    tabs.style.opacity = '1'
    searchopt.disabled = false
    searchopt.setAttribute("placeholder", "Search Watchlist")
  }else if(input.id === 'home-tab') {
    tabs.style.opacity = '0'
    searchopt.disabled = true
  }

}
function genreModalInit() {
  Array.from(document.querySelectorAll('#genre-modal .btn-close')).forEach((el) => {
    el.addEventListener('click', () => {
      Renderer.modals.genres.hide();
    });
  });
  document.getElementById('genre-modal-submit').addEventListener('click', () => {
    const type = document.getElementsByClassName('genre-item')[0].children[0].id.split('_')[0];
    const genreList = document.getElementById(`${type}-filter-genre-list`);
    genreList.innerHTML = '';
    Array.from(document.getElementsByClassName('genre-item')).forEach((el) => {
      const checkbox = el.querySelector('input');
      if (checkbox.checked === true) {
        api.genreList[type][checkbox.value].checked = true;
        console.log(genreList.children.length);
        if (genreList.children.length <= 4) {
          const genreSpan = document.createElement('span');
          genreSpan.classList.add('genre-list-item');
          genreSpan.textContent = api.genreList[type][checkbox.value].name;
          genreList.append(genreSpan);
        }
      } else {
        api.genreList[type][checkbox.value].checked = false;
      }
    });
    if (genreList.children.length > 4) {
      const endcap = document.createElement('span');
      endcap.textContent = `+${genreList.children.length - 4} more...`;
      endcap.classList.add('genre-list-item');
      genreList.append(endcap);
    }
    Renderer.modals.genres.hide();
  });
}
genreModalInit();

function initSortAndFilter() {

  Array.from(document.getElementsByClassName('filter-submit')).forEach((button) => {
    button.addEventListener('click', () => {
      let type
      if (api.active === 'movies-tab') {
         type = 'movies'
      }else if(api.active === 'tv-tab') {
          type = 'tv'
      }    
      const sortCriteria = document.getElementById(`${type}-sort-criteria`).value;
      const genres = Object.keys(api.genreList[type]).filter((genre) => api.genreList[type][genre].checked === true);
      const options = {
        page: 1,
        sort_by: sortCriteria,
        with_genres: genres.join(',')
      };
      type === 'tv' ? options['air_date.gte'] = '' : options['primary_release_date.gte'] = '';
      api.discover(type, Object.assign(api.defaultDiscoverOptions[type], options)).then((data) => {
        document.getElementById(`${type}-grid`).innerHTML = '';
        console.log(document.getElementById(`${type}-grid`), data.results, type)
        renderList(document.getElementById(`${type}-grid`), data.results, type);
      });
    });
  });
}
initSortAndFilter();

function loadMore(type) {
  api.currentQuery[type].page += 1;
  api.discover(type, api.currentQuery[type]).then((data) => {
    renderList(document.getElementById(`${type}-grid`), data.results, type);
  });
}

Array.from(document.getElementsByClassName('genre-button')).forEach((button) => {
  button.addEventListener('click', (e) => {
    Renderer.renderGenres(e.target.dataset.type, api.genreList[e.target.dataset.type]);
  });
});

function defaultRender() {
  const tvOptions = api.defaultDiscoverOptions.tv;
  const movieOptions = api.defaultDiscoverOptions.movie;
  for (let i = 1; i <= 5; i++) {
    movieOptions.page = i;
    api.discover('movie', movieOptions).then((data) => {
      renderList(document.getElementById('movie-grid'), data.results, 'movie');
      api.maxPage.movie = data.total_pages;
    });
    tvOptions.page = i;
    api.discover('tv', tvOptions).then((data) => {
      renderList(document.getElementById('tv-grid'), data.results, 'tv');
      api.maxPage.tv = data.total_pages;
    });
  }
  api.currentPage.tv = 5;
  api.currentPage.movie = 5;
}

document.addEventListener('mediaClicked', (e) => { Renderer.renderMediaModal(e.detail); });

document.addEventListener('DOMContentLoaded', () => {
  api.movie('now_playing').then((data) => renderList(document.getElementById('now-playing'), data.results, 'movie'));
  api.tv('on_the_air').then((data) => renderList(document.getElementById('popular-tv'), data.results, 'tv'));
  defaultRender();

  let tabControl = document.getElementById('searchcont')
  tabControl.style.opacity = '0'
  document.getElementById('search')[0].disabled = true

  document.getElementById('page-select').addEventListener('click', (e) => { searchHide(e.target)})

  if (false) {
    document.getElementById('splash-screen').style.display = 'flex';
    splashStartAnimation();
    splashEndAnimation();
  }

  document.getElementById('search').addEventListener('submit', (e) => {
    // movies.innerHTML = '';
    e.preventDefault();
    api.searchAll('multi',e.target[0].value).then((data) => processmovies(data.results));
    e.target[0].value = ''
  });
});
