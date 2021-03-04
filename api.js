class API {
  constructor() {
    this.baseURL = 'https://api.themoviedb.org/3/';
    this.api_key = Api.key;
  }

  async get(url, options = {}) {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  }

  async searchAll(query) {
    const url = `${this.baseURL}search/multi?api_key=${this.api_key}&query=${query}`;
    const data = await this.get(url);
    return data;
  }

  async playingnow() {
    const url = `${this.baseURL}movie/now_playing?api_key=${this.api_key}`;
    const data = await this.get(url);
    return data;
  }

  async getUpcoming(type) {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 4);
    const month = (future.getMonth() + 1) < 10 ? `0${(future.getMonth() + 1)}` : future.getMonth() + 1;
    const day = (future.getDate() + 1) < 10 ? `0${(future.getDate() + 1)}` : future.getDate() + 1;
    const string = `${future.getFullYear()}-${month}-${day}`;
    const url = `${this.baseURL}discover/${type}?api_key=${this.api_key}&sort_by=release_date.desc&release_date.lte=${string}`;
    const data = await this.get(url);
    return data;
  }
}
