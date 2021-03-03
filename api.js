document.addEventListener('DOMContentLoaded', () => {
   document.querySelector('button').addEventListener('click',() => {  apicall().then(data => console.log(data))})
})
// function fetch() {
//     apicall()
//     .then(data => console.log(data))
// }
// function process(obj) {
//     console.log(obj)
// }

async function apicall(){
   let res = await fetch(`http://api.tvmaze.com/singlesearch/shows?q=avengers`)
    let data = await res.json()
    return data
}