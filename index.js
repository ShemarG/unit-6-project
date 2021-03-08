const api = new API();

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
    const type = button.id.split('-')[0];
    button.addEventListener('click', () => {
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
        renderList(document.getElementById(`${type}-grid`), data.results, type);
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

function handleNavClick(nav) {
  const searchBar = document.querySelector('header').querySelector('div');
  const selected = nav.target.id;
  if (selected === 'home-tab') {
    searchBar.style.display = 'none';
  } else if (selected === 'movie-tab' || selected === 'tv-tab') {
    searchBar.style.display = 'block';
  } else {
    searchBar.style.display = 'none';
  }
  api.currentTab = selected;
  scrollToTop();
}

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
  api.currentTab = 'home-tab';
}

document.addEventListener('mediaClicked', (e) => Renderer.renderMediaModal(e.detail));

document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.getElementsByClassName('nav-link')).forEach((navlink) => {
    navlink.addEventListener('click', (e) => { handleNavClick(e); });
  });

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

  if (false) {
    document.getElementById('splash-screen').style.display = 'flex';
    splashStartAnimation();
    splashEndAnimation();
  }

  // document.getElementById('searchbar').addEventListener('submit', (e) => {
  //   movies.innerHTML = '';
  //   e.preventDefault();
  //   api.searchAll(e.target[0].value).then((data) => processmovies(data.results));
  // });
});
