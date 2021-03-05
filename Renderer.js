class Renderer {
  static getImgSrc(path) {
    return `https://image.tmdb.org/t/p/w500/${path}`;
  }

  static renderMedia(media, imgOnly = false) {
    const container = document.createElement('div');
    container.classList.add('media');
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
    // Info
    if (!imgOnly) {
      const info = document.createElement('div');
      info.classList.add('media-info');
      info.textContent = media.title || media.name;
      container.append(info);
    }
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
