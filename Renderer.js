class Renderer {
  static modals = {
    media: new bootstrap.Modal(document.getElementById('media-modal')),
    genres: new bootstrap.Modal(document.getElementById('genre-modal'))
  }

  static getImgSrc(path) {
    return `https://image.tmdb.org/t/p/w500/${path}`;
  }

  static renderTVHoverState(el, tv) {
    const container = document.createElement('div');
    container.classList.add('media-tv-hover');

    const title = document.createElement('h5');
    title.classList.add('media-tv-title');
    title.textContent = tv.title || tv.name;
    container.append(title);

    api.tv(tv.id).then((data) => {
      if (data.status === 'Returning Series') {
        if (data.next_episode_to_air) {
          const currentSeasonAndEp = document.createElement('p');
          currentSeasonAndEp.classList.add('tv-season-and-ep');
          const season = data.next_episode_to_air.season_number;
          const episode = data.next_episode_to_air.episode_number;
          currentSeasonAndEp.innerText = `Season: ${season} Epsd: ${episode}`;

          const networkAirDate = document.createElement('p');
          networkAirDate.classList.add('tv-network-airdate');
          networkAirDate.textContent = `Airing on: ${data.next_episode_to_air.air_date}`;

          if (data.networks !== undefined && data.networks[0] !== undefined) {
            const network = document.createElement('p');
            network.classList.add('tv-network-info');

            const networkImg = document.createElement('img');
            networkImg.classList.add('tv-network-img');

            network.innerText = `Network: ${data.networks[0].name}`;
            networkImg.src = `${this.getImgSrc(data.networks[0].logo_path)}`;
            container.append(network, networkImg, currentSeasonAndEp, networkAirDate);
          }
        } else {
          const currentSeason = document.createElement('p');
          currentSeason.classList.add('tv-season-and-ep');
          const season = data.seasons[data.seasons.length - 1].season_number;
          currentSeason.innerText = `Season: ${season}`;
          container.append(currentSeason);
        }
      } else if (data.status === 'Ended' || data.status === 'Canceled') {
        const status = document.createElement('p');
        status.textContent = data.status;

        const lastSeason = document.createElement('p');
        lastSeason.classList.add('tv-season-and-ep');
        const season = data.seasons[data.seasons.length - 1].season_number;
        lastSeason.innerText = `Seasons: ${season}`;
        container.append(status, lastSeason);
      }
      el.append(container);
    });
  }

  static renderMovieHoverState(el, movie) {
    const container = document.createElement('div');
    container.classList.add('media-movie-hover');

    const title = document.createElement('h5');
    title.textContent = movie.title;
    title.classList.add('media-movie-title');

    const release = document.createElement('p');
    release.textContent = movie.release_date;

    const votes = document.createElement('p');
    votes.textContent = `Rating: ${movie.vote_average}`;

    container.append(title, release, votes);
    el.append(container);
  }

  static renderMedia(media, className) {
    const container = document.createElement('div');
    container.classList.add('media');
    if (className) container.classList.add(className);
    container.addEventListener('click', () => {
      this.modals.media.show();
      document.dispatchEvent(new CustomEvent('mediaClicked', { detail: { id: media.id, type: media.title ? 'movie' : 'tv' } }));
    });
    // Image
    const img = document.createElement('img');
    img.src = media.poster_path ? this.getImgSrc(media.poster_path) : 'img/noimg.jpg';
    img.classList.add('media-img');
    container.append(img);
    return container;
  }

  static renderMediaModal(media) {
    const modalContainer = document.getElementById('media-modal-container');
    const modalBody = document.getElementById('media-modal-body');
    const loadingScreen = document.getElementById('media-modal-loading-screen');
    modalBody.innerHTML = '';
    modalBody.style.display = 'none';
    loadingScreen.style.display = 'block';
    api[media.type](media.id).then((data) => {
      console.log(data);
      modalBody.append(this.renderMedia(data, true));
      modalBody.style.display = 'block';
      loadingScreen.style.display = 'none';
    });
  }

  static renderGenres(type, genres) {
    console.log(genres);
    const modalContainer = document.getElementById('genre-modal-container');
    const modalTitle = document.getElementById('genre-modal-title');
    modalTitle.textContent = `${type === 'tv' ? 'TV Show' : 'Movie'} Genres`;
    const modalBody = document.getElementById('genre-modal-body');
    modalBody.innerHTML = '';
    Object.keys(genres).forEach((genre, i) => {
      const checkboxContainer = document.createElement('span');
      checkboxContainer.classList.add('genre-item');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = genre;
      checkbox.checked = genres[genre].checked;
      checkbox.id = `${type}_genre_${i}`;
      const label = document.createElement('label');
      label.textContent = genres[genre].name;
      label.htmlFor = checkbox.id;
      checkboxContainer.append(checkbox, label);
      modalBody.append(checkboxContainer);
    });

    this.modals.genres.show();
  }
}
