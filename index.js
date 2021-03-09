const api = new API();
api.active = 'home-tab';
// watchlist
const user = new User();

const watchBtn = document.getElementsByClassName('watchListbtn');

setTimeout(() => {
  const arr = Array.from(watchBtn);
  arr.forEach((btn) => {
    btn.addEventListener('click', addToWatchList);
  });
}, 2000);

// temp
/*
function addToWatchList() {
  setTimeout(() => {
    console.log(user.watchList.tv)
    if(Object.keys(user.watchList.movie).length !== 0) {
      console.log('hey2')
      renderList(document.getElementById('movieList'),Object.values(user.watchList.movie), 'movie');
      return user.reset()
    }else if(Object.keys(user.watchList.tv).length !== 0) {
      console.log('hey3')
      renderList(document.getElementById('tvList'), Object.values(user.watchList.tv), 'tv');
      return user.reset()
    }else{}

  }, 100)

} */
function addToWatchList() {
  setTimeout(() => {
    console.log(user.watchList.tv);
    if (Object.keys(user.watchList.movie).length !== 0) {
      console.log('hey2');
      renderList(document.getElementById('movieList'), Object.values(user.watchList.movie), 'movie');
      return user.reset();
    } if (Object.keys(user.watchList.tv).length !== 0) {
      console.log('hey3');
      renderList(document.getElementById('movieList'), Object.values(user.watchList.tv), 'tv');
      return user.reset();
    }
  }, 100);
}
function processmovies(obj) {
  const moviegridcont = document.getElementById('movie-grid');
  const tvshowcont = document.getElementById('tv-grid');
  if (api.active === 'tv-tab') {
    tvshowcont.innerHTML = '';
    renderList(tvshowcont, obj, 'tv');
  } else if (api.active === 'movie-tab') {
    moviegridcont.innerHTML = '';
    renderList(moviegridcont, obj, 'movie');
  }
}
function searchHide(input) {
  const tabs = document.getElementById('searchcont');
  const searchopt = document.getElementById('search')[0];
  scrollToTop();
  // console.log(tabs[0])
  if (input.id === 'movie-tab') {
    api.active = 'movie-tab';
    tabs.style.opacity = '1';
    searchopt.disabled = false;
    searchopt.setAttribute('placeholder', 'Search Movies');
  } else if (input.id === 'tv-tab') {
    api.active = 'tv-tab';
    tabs.style.opacity = '1';
    searchopt.disabled = false;
    searchopt.setAttribute('placeholder', 'Search TV Shows');
  } else if (input.id === 'watchlist') {
    api.active = 'watchlist';
    tabs.style.opacity = '1';
    searchopt.disabled = false;
    searchopt.setAttribute('placeholder', 'Search Watchlist');
  } else if (input.id === 'home-tab') {
    tabs.style.opacity = '0';
    searchopt.disabled = true;
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
    button.classList.add('btn', 'btn-primary');
    button.addEventListener('click', () => {
      let type;
      if (api.active === 'movie-tab') {
        type = 'movie';
      } else if (api.active === 'tv-tab') {
        type = 'tv';
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
        console.log(document.getElementById(`${type}-grid`), data.results, type);
        renderList(document.getElementById(`${type}-grid`), data.results, type);
        scrollToTop();
      });
    });
  });
}
initSortAndFilter();

function scrollToTop() {
  const html = document.querySelector('html');
  const interval = setInterval(() => {
    if (html.scrollTop < 500) {
      html.scrollTop = 0;
      clearInterval(interval);
    } else {
      html.scrollTop -= 500;
    }
  }, 10);
}

function loadMore(type) {
  api.currentQuery[type].page += 1;
  api.discover(type, api.currentQuery[type]).then((data) => {
    renderList(document.getElementById(`${type}-grid`), data.results, type);
  });
}

Array.from(document.getElementsByClassName('genre-button')).forEach((button) => {
  button.classList.add('btn', 'btn-secondary');
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
  api.currentTab = 'home-tab';
}

document.addEventListener('mediaClicked', (e) => Renderer.renderMediaModal(e.detail));

document.addEventListener('scroll', () => {
  const htmlScroll = document.querySelector('html');
  if (htmlScroll.scrollTop === (htmlScroll.offsetHeight - htmlScroll.clientHeight)) {
    loadMore(`${api.active === 'movie-tab' ? 'movie' : 'tv'}`);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  api.movie('now_playing').then((data) => {
    let arr = data.results;
    const carouselItems = document.getElementById('now-playing').querySelector('.carousel-inner');
    let currentCarouselIndex = 0;
    for (let i = 0; i <= data.results.length; i++) {
      if (!(i % 5) && i !== 0) {
        arr = data.results.slice(i - 5, i);
        renderList(carouselItems.children[currentCarouselIndex], arr, 'movie');
        currentCarouselIndex += 1;
      }
    }
    // renderList(document.getElementById('now-playing'), data.results, 'movie')
  });
  api.tv('on_the_air').then((data) => {
    let arr = data.results;
    const carouselItems = document.getElementById('now-airing').querySelector('.carousel-inner');
    let currentCarouselIndex = 0;
    for (let i = 0; i <= data.results.length; i++) {
      if (!(i % 5) && i !== 0) {
        arr = data.results.slice(i - 5, i);
        renderList(carouselItems.children[currentCarouselIndex], arr, 'tv');
        currentCarouselIndex += 1;
      }
    }
  });
  defaultRender();

  const tabControl = document.getElementById('searchcont');
  tabControl.style.opacity = '0';
  document.getElementById('search')[0].disabled = true;

  document.getElementById('page-select').addEventListener('click', (e) => { searchHide(e.target); });

  if (false) {
    document.getElementById('splash-screen').style.display = 'flex';
    splashStartAnimation();
    splashEndAnimation();
  }

  document.getElementById('search').addEventListener('submit', (e) => {
    // movies.innerHTML = '';
    e.preventDefault();
    api.searchAll('multi', e.target[0].value).then((data) => processmovies(data.results));
    e.target[0].value = '';
  });
});
