class User {
  constructor() {
    this.watchList = { tv: {}, movie: {} } || this.getWatchList();
  }

  getWatchList() {
    this.watchlist = JSON.parse(localStorage.getItem('userWatchList'));
  }

  setWatchList(obj) {
    localStorage.setItem('userWatchList', JSON.stringify(obj));
  }

  clearUserData() {
    localStorage.clear();
    this.getWatchList();
  }
}
