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

document.addEventListener('DOMContentLoaded', () => {
  if (false) {
    document.getElementById('splash-screen').style.display = 'flex';
    splashStartAnimation();
    splashEndAnimation();
  }
});
