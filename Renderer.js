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
    const info = document.createElement('h3');
    info.classList.add('media-info');
    const infocont = document.createElement('div');
    infocont.classList.add('media-info-container','media-img');
    info.textContent = media.title || media.name;
    container.addEventListener('mouseover', (e) => {
      e.target.style.borderRadius = '20px'
      img.style.borderRadius = '20px'
    })
    container.addEventListener('mouseout',(e) => {
      e.target.style.borderRadius = '0px'
      img.style.borderRadius = '0px'
    })
    infocont.append(info)
    container.append(img, infocont);
    return container;
  }
}
class Render {
  static renderMedia(media) {
    const container = document.createElement('div');
    container.classList.add('home-media');
    // Image
    const imgAPIEndpoint = 'https://image.tmdb.org/t/p/w500';
    const img = document.createElement('img');
    img.src = media.poster_path ? `${imgAPIEndpoint}/${media.poster_path}` : 'img/noimg.jpg';
    img.classList.add('media-imgs');
    // Info

    // const info = document.createElement('h3');
    // info.classList.add('media--info');
    // const infocont = document.createElement('div');
    // infocont.classList.add('media-info-containe');
    // info.textContent = media.title || media.name;
    // container.addEventListener('mouseover', (e) => {
    //   e.target.style.borderRadius = '20px'
    //   img.style.borderRadius = '20px'
    // })
    // container.addEventListener('mouseout',(e) => {
    //   e.target.style.borderRadius = '0px'
    //   img.style.borderRadius = '0px'
    // })
    // infocont.append(info)
    container.append(img);
    return container;
  }
}