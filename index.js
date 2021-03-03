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

function process(obj) {
  console.log(obj);
  obj.forEach((multi) => {
    const imgdiv = document.createElement('div');
    if (multi.poster_path === null) {
      imgdiv.innerHTML = '<img src="img/noimg.jpg"/>';
    } else {
      imgdiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${multi.poster_path}"/>`;
    }
    console.log(multi.poster_path);

    home.append(imgdiv);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (false) {
    document.getElementById('splash-screen').style.display = 'flex';
    splashStartAnimation();
    splashEndAnimation();
  }
});
