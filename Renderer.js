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
  
      
      const info = document.createElement('h4');
    info.classList.add('media-info');
    const network = document.createElement('h4');
    network.classList.add('network-info');
    const networkimg = document.createElement('img');
    networkimg.classList.add('network-img');
    const networkairdate = document.createElement('p');
    networkairdate.classList.add('network-airdate');
    if(media.networks !== undefined && media.networks[0] !== undefined) {
      network.innerText = `Network: ${media.networks[0].name}`
      networkimg.src = `${imgAPIEndpoint}${media.networks[0].logo_path}`
      let next = media.next_episode_to_air.air_date
      let episd = media.next_episode_to_air.episode_number
      networkairdate.innerText = `Next: ${next} Epsd: ${episd}`
      console.log(media.next_episode_to_air)
    // media.networks.forEach(data => {
    //   console.log(data)
    //   network.innerText = `Network: ${data.name}`
    // })
    }else{} 
    const infocont = document.createElement('div');
    infocont.classList.add('media-info-container','media-img');
    info.textContent = media.title || media.name;
    }
    
//     container.addEventListener('mouseover', (e) => {
//       e.target.style.borderRadius = '20px'
//       img.style.borderRadius = '20px'
//     })
//     container.addEventListener('mouseout',(e) => {
//       e.target.style.borderRadius = '0px'
//       img.style.borderRadius = '0px'
//     })
    infocont.append(info,network,networkairdate,networkimg)
    container.append(img, infocont);
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
// class Render {
//   static renderMedia(media) {
//     const container = document.createElement('div');
//     container.classList.add('home-media');
//     // Image
//     const imgAPIEndpoint = 'https://image.tmdb.org/t/p/w500';
//     const img = document.createElement('img');
//     img.src = media.poster_path ? `${imgAPIEndpoint}/${media.poster_path}` : 'img/noimg.jpg';
//     img.classList.add('media-imgs');
//     // Info

//     const info = document.createElement('h3');
//     info.classList.add('media--info');
//     const infocont = document.createElement('div');
//     infocont.classList.add('media-info-containe');
//     info.textContent = media.title || media.name;
//     container.addEventListener('mouseover', (e) => {
//       e.target.style.borderRadius = '20px'
//       img.style.borderRadius = '20px'
//     })
//     container.addEventListener('mouseout',(e) => {
//       e.target.style.borderRadius = '0px'
//       img.style.borderRadius = '0px'
//     })
//     infocont.append(info)
//     container.append(img);
//     return container;
//   }
// }