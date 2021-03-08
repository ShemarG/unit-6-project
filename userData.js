// function watchlist(obj) {
//     console.log(obj)
//   }

class User {
    constructor () {
        this.watchList = { } || this.getWatchList()
    }

    getWatchList() {
        this.watchlist =  JSON.parse(localStorage.getItem('userWatchList'))
    }
    setWatchList(obj) {
         localStorage.setItem('userWatchList', JSON.stringify(obj))
    }
    clearUserData() {
        localStorage.clear()
        this.getWatchList()
    }
}