function splashEndAnimation() {
  setTimeout(() => {
    document.getElementById('splash-screen').classList.add('animate__zoomOut');
    setTimeout(() => { document.getElementById('splash-screen').style.display = 'none'; }, 1500);
  }, 4000);
}

function splashStartAnimation() {
  document.querySelector('#splash-screen h1').classList.add('animate__animated', 'animate__slideInDown');
  document.querySelector('#splash-screen p').classList.add('animate__animated', 'animate__slideInUp');
}

const api = new API();

function processmovies(obj) {
  // console.log(obj);

  const divhold = document.createElement('div');
  divhold.id = 'moviebody';
  obj.forEach((multi) => {
    if (multi.media_type === 'movie') {
      const imgdiv = document.createElement('div');
      imgdiv.classList.add('moviestemp')  ;
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
function tvpopular(obj) {
  console.log(obj)
  obj.forEach((now) => {
    populartv.append(Renderer.renderMedia(now))
  })
}
function intheaters(obj) {
  
  obj.forEach((now) => {
    nowplaying.append(Renderer.renderMedia(now));
    // const imgdiv = document.createElement('div');
    // imgdiv.id = 'nowimages';
    // imgdiv.innerHTML = `<img class="nowimg" src="https://image.tmdb.org/t/p/w500${now.poster_path}"/>`;
    // nowplaying.append(imgdiv);
  });
  // console.log(obj);
}

document.addEventListener('DOMContentLoaded', () => {
  api.playingnow().then((data) => intheaters(data.results));
  api.populartv().then((data) => tvpopular(data.results))
  if (false) {
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
