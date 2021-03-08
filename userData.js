// function watchlist(obj) {
//     console.log(obj)
//   }

class User {
    constructor () {
        this.watchList = {} || this.getWatchList()
    }

    getWatchList() {
        this.watchlist =  JSON.parse(localStorage.getItem('userWatchList'))
    }
    setWatchList() {
         localStorage.setItem('userWatchList', JSON.stringify(this.watchList))
    }
    clearUserData() {
        localStorage.clear()
        this.getWatchList()
    }
}