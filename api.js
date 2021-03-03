class API {
  constructor() {
    this.baseURL = 'https://api.themoviedb.org/3/';
    this.api_key = Api.key;
  }

  async searchAll(query) {
    const url = `${this.baseURL}/multi?/${this.api_key}/&query=${query}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}

async function apicall() {
  const res = await fetch('http://api.tvmaze.com/singlesearch/shows?q=avengers');
  const data = await res.json();
  return data;
}

async function apicall2() {
  const future = new Date();
  future.setFullYear(future.getFullYear() + 4);
  const string = `${future.getFullYear()}-0${future.getMonth() + 1}-0${future.getDate()}`;
  console.log(string);
  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3503465b6ea7762aefdbd3aec63352b8&language=en-USS&sort_by=release_date.desc&release_date.lte=${string}`);
  const data = await res.json();
  return data;
}
// function fetch() {
//     apicall()
//     .then(data => console.log(data))
// }
// function process(obj) {
//     console.log(obj)
// }

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button').addEventListener('click', () => {
    apicall().then((data) => { console.log(data); });
    apicall2().then((data) => { console.log(data); });
  });
});
