const beerURL="http://localhost:3000/beers/1"
const BeerName= document.getElementsByClassName("beer-details")[0].firstElementChild
const BeerPic= document.getElementsByClassName("beer-details")[0].children[1]
const BeerDescription= document.getElementsByClassName("beer-details")[0].children[2].firstElementChild
const BeerSection = document.getElementsByClassName("reviews")[0]
const ReviewInput = document.getElementsByClassName("review-input")[0]


// //fetch
// function fetchBeer(){
// fetch(beerURL)
// .then(resp => resp.json())
// .then(beersData => renderBeers(beersData))
// .catch(err => console.log(err))
// }

// function renderBeers(beersData){
//   beersData.forEach(beerData => renderOneBeer(beerData))
//   }


//   function renderOneBeer(beerData){
//   BeerName.innerHTML = beer.name
//   BeerPic.src = `${beer.image_url}`
//   BeerDescription.innerHTML = beer.description
  
//   renderReviews(beer)
//   function renderReviews(beer) {
//     BeerSection.innerHTML=" "
//     beer.reviews.forEach(review => {
//       BeerSection.innerHTML += `<li>${beer.review} <li>`
//         })
//     }
//   }
function fetchBeer(){
  fetch(beerURL)
  .then(resp => resp.json())
  .then(beer => {
    //debugger
    BeerName.innerHTML = beer.name
    BeerPic.src = `${beer.image_url}`
    BeerDescription.innerHTML = beer.description

    BeerSection.innerHTML=""
    beer.reviews.forEach(review => {
    BeerSection.innerHTML += `<li>${beer.review} <li>`})
  })
}
//////////EventListener
//ReviewInput.addEventListener("submit", addReview)





function addReview() {
  //debugger
  event.preventDefault();//need define
  const review = event.target.review.value 
  event.target.reset();

  const reqObj = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          beerId: 1,
          review: review})
  }

  fetch(beerURL, reqObj)
  .then(resp => resp.json())
  .then(json => fetchBeer())
}
// function renderCommentEvent() {
// const ReviewInput = document.getElementsByClassName("review-form")
// for (let i=0; i< ReviewInput.length; i++) {
addEventListener("submit", addReview)
//   }
// }

//invoke
fetchBeer()
addReview()

