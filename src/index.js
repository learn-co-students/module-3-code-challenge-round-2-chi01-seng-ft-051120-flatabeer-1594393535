const BASE_URL = "http://localhost:3000"
const BEER_URL = `${BASE_URL}/beers/2`
const reviewArea = document.getElementById('customer-reviews')
const descriptionArea = document.getElementsByClassName('description')
const imageArea = document.querySelector('img');
const beerName = document.getElementById('beer-name')
const updateBtn = document.getElementsByClassName('beer-update')
const reviewText = document.getElementById('leave-review')
const updateText = document.getElementById('update-beer-text')
// console.log(descriptionArea)


function loadBeer() {
  fetch(BEER_URL)
  .then(resp => resp.json())
  .then(beer => renderBeerData(beer))
};

function renderBeerData(beer) {
  imageArea.src = beer.image
  beerName.innerText = beer.name
  reviewArea.innerHTML = ""
  beer.reviews.forEach(review => {
    reviewArea.innerHTML += `<li>${review}</li>`
    console.log(review)
 });
};



// function updateBeer(beer) {
//   let reqObj = {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       content: 
//   });
// };

// function leaveReview(reviews) {
//   return {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify( {
//       reviews:
//     })
//   }
// };





/////////////////INVOKED FUNCTIONS//////////////
loadBeer();
updateBeer();
leaveReview();