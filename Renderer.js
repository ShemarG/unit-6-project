class Renderer {
  static getImgSrc(path) {
    return `https://image.tmdb.org/t/p/w500/${path}`;
  }

  static renderHoverState(el, media) {
    console.log(media.networks);
    const info = document.createElement('h4');
    info.classList.add('media-info');
    const network = document.createElement('h4');
    network.classList.add('network-info');
    const networkImg = document.createElement('img');
    networkImg.classList.add('network-img');
    const networkAirDate = document.createElement('p');
    networkAirDate.classList.add('network-airdate');
    if (media.networks !== undefined && media.networks[0] !== undefined) {
      network.innerText = `Network: ${media.networks[0].name}`;
      networkImg.src = `${this.getImgSrc(media.networks[0].logo_path)}`;
      const next = media.next_episode_to_air.air_date;
      const episode = media.next_episode_to_air.episode_number;
      networkAirDate.innerText = `Next: ${next} Epsd: ${episode}`;
    }
    const infocont = document.createElement('div');
    infocont.classList.add('media-info-container', 'media-img');
    info.textContent = media.title || media.name;
    infocont.append(info, network, networkImg, networkAirDate);
    el.append(infocont);
  }

  static renderMedia(media, className) {
    const container = document.createElement('div');
    container.classList.add('media');
    if (className) container.classList.add(className);
    container.setAttribute('data-toggle', 'modal');
    container.setAttribute('data-target', '#media-modal');
    container.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('mediaClicked', { detail: { id: media.id, type: media.title ? 'movie' : 'tv' } }));
    });
    // Image
    const img = document.createElement('img');
    img.src = media.poster_path ? this.getImgSrc(media.poster_path) : 'img/noimg.jpg';
    img.classList.add('media-img');
    container.append(img);
    return container;
  }

  static renderModal(media) {
    const modalContainer = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const loadingScreen = document.getElementById('loading-screen');
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
}
