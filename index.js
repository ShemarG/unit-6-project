const api = new API();

function processmovies(obj) {
  // console.log(obj);

  const divhold = document.createElement('div');
  divhold.id = 'moviebody';
  obj.forEach((multi) => {
    if (multi.media_type === 'movie') {
      const imgdiv = document.createElement('div');
      imgdiv.classList.add('moviestemp');
      if (multi.poster_path === null) {
        imgdiv.innerHTML = `<img class="movieimg" src="img/noimg.jpg"/>
                           <div id="movieinfo">
                           <h2>${multi.title}</h2>
                           <h3 class="ratings" >Ratings ${multi.vote_average}</h3>
                           </div>`;
      } else {
        imgdiv.innerHTML = `<img class="movieimg" src="https://image.tmdb.org/t/p/w500${multi.poster_path}"/>
                          <div id="movieinfo">
                          <h2>${multi.title}</h2>
                          <h3 class="ratings" >Ratings ${multi.vote_average}</h3>
                          </div>`;
      }
      console.log(multi);
      divhold.append(imgdiv);
      movies.append(divhold);
    }
  });
}

document.addEventListener('mediaClicked', (e) => { Renderer.renderModal(e.detail); });

document.addEventListener('DOMContentLoaded', () => {
  api.movie('now_playing').then((data) => renderList(document.getElementById('now-playing'), data.results));
  api.tv('popular').then((data) => renderList(document.getElementById('popular-tv'), data.results));
  if (true) {
    document.getElementById('splash-screen').style.display = 'flex';
    splashStartAnimation();
    splashEndAnimation();
  }
  document.getElementById('searchbar').addEventListener('submit', (e) => {
    movies.innerHTML = '';
    e.preventDefault();
    api.searchAll(e.target[0].value).then((data) => processmovies(data.results));
  });
});
