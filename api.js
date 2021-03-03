document.addEventListener('DOMContentLoaded', () => {
   document.getElementById('searchbar').addEventListener('submit',(e) => { 
       e.preventDefault()
        apicall(e.target[0].value).then(data => process(data.results))
})
let home = document.getElementById('home')
})
// function fetch() {
//     apicall()
//     .then(data => console.log(data))
// }
function process(obj) {
    console.log(obj)
    obj.forEach(multi => {
        let imgdiv = document.createElement('div')
        if(multi.poster_path === null){
            imgdiv.innerHTML = `<img src="img/noimg.jpg"/>`
        }else {
            imgdiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${multi.poster_path}"/>`
        }
        console.log(multi.poster_path)
       
        home.append(imgdiv)
    })
  
}

async function apicall(input){
   let res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${Api.key}&language=en-US&query=${input}`)
    let data = await res.json()
    return data
}