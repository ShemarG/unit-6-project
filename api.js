class API {
  constructor() {
    this.baseURL = 'https://api.themoviedb.org/3/';
    this.api_key = Api.key;
    this.upcoming = {};
  }

  async get(url, options = {}) {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  }

  searchAll(query) {
    const url = `${this.baseURL}search/multi?api_key=${this.api_key}&query=${query}`;
    this.get(url).then((data) => data);
  }

  getUpcoming(type) {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 4);
    const month = (future.getMonth() + 1) < 10 ? `0${(future.getMonth() + 1)}` : future.getMonth() + 1;
    const day = (future.getDate() + 1) < 10 ? `0${(future.getDate() + 1)}` : future.getDate() + 1;
    const string = `${future.getFullYear()}-${month}-${day}`;
    const url = `${this.baseURL}discover/${type}?api_key=${this.api_key}&sort_by=release_date.desc&release_date.lte=${string}`;
    this.get(url).then((data) => {
      this.upcoming[type] = data.results;
    });
  }
}
