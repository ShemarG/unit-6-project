class API {
  constructor() {
    this.baseURL = 'https://api.themoviedb.org/3/';
    this.api_key = Api.key;
  }

  static interpolateQueries(queryObj) {
    return Object.keys(queryObj).reduce((acc, curr) => `${acc}&${curr}=${queryObj[curr]}`, '');
  }

  async get(url, options = {}) {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  }

  async movie(endpoint, queryParams = {}) {
    let data;
    switch (endpoint) {
      default:
        data = await this.get(`${this.baseURL}movie/${endpoint}?api_key=${this.api_key}${API.interpolateQueries(queryParams)}`);
        return data;
    }
  }

  async tv(endpoint, queryParams = {}) {
    let data;
    switch (endpoint) {
      default:
        data = await this.get(`${this.baseURL}tv/${endpoint}?api_key=${this.api_key}${API.interpolateQueries(queryParams)}`);
        return data;
    }
  }

  //   async searchAll(query) {
  //     const url = `${this.baseURL}search/multi?api_key=${this.api_key}&query=${query}`;

  //   async populartv(num) {
  //     const url = `${this.baseURL}tv/popular?api_key=${this.api_key}&page=${num}`;

  //     const data = await this.get(url);
  //     return data;
  //   }

  async tvshowstab(num) {
    const url = `${this.baseURL}tv/on_the_air?api_key=${this.api_key}&page=${num}`;
    const data = await this.get(url);
    return data;
  }

  async automovie(num) {
    const url = `${this.baseURL}movie/popular?api_key=${this.api_key}&page=${num}`;
    const data = await this.get(url);
    return data;
  }
  // async automovie2() {
  //   const url = `${this.baseURL}movie/popular?api_key=${this.api_key}&page=2`;
  //   const data = await this.get(url);
  //   return data;
  // }

  async network(id) {
    const url = `${this.baseURL}tv/${id}?api_key=${this.api_key}`;
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
