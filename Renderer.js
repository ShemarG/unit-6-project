class Renderer {
  static renderMedia(media) {
    const container = document.createElement('div');
    container.classList.add('media');
    // Image
    const imgAPIEndpoint = 'https://image.tmdb.org/t/p/w500';
    const img = document.createElement('img');
    img.src = media.poster_path ? `${imgAPIEndpoint}/${media.poster_path}` : 'img/noimg.jpg';
    img.classList.add('media-img');
    // Info
    const info = document.createElement('div');
    info.classList.add('media-info');
    info.textContent = media.title;
    container.append(img, info);
    return container;
  }
}
