// Code here
const beerDetails = document.querySelector('.beer-details')
const description = document.querySelector('.description')
const reviewInput = document.querySelector('.review-form')

function fetchBeerDeets(){
  fetch('http://localhost:3000/beers/1')
  .then(resp => resp.json())
  .then(beerData => createBeerDeets(beerData))
  .catch(err => console.log(err))
}

function createBeerDeets(beerData){
  const beerName = document.querySelector('h2')
  beerName.innerHTML = beerData.name 
  const beerImage = document.querySelector('img')
  beerImage.src = beerData.image_url
  const beerDescription = document.querySelector('textarea')
  beerDescription.innerHTML = beerData.description
  beerDescription.id = beerData.id
  beerData.reviews.forEach(beerReview => createReviewLi(beerReview))
  
}

function createReviewLi(beerReview){
  
  const beerReviews = document.querySelector('.reviews')
  const li = `<li>${beerReview}</li>
  `
  beerReviews.innerHTML += li
}

function editDescriptionHandler(){
  if (event.target.tagName === "BUTTON"){
    //renderBeerDescription();
    editDescription();
  }
  
}

// function editDescription(){
  
//   event.preventDefault()
//   const description = String(event.target.parentElement.children[0].innerHTML)
//   editedDescription(description)
//   event.target.reset
// }



function patchObj(){
  const newDescription = String(event.target.parentElement.children[0].value)
  return {
    method: 'PATCH',
    headers: {
       "Content-Type": "application/json",
       accept: "application/json"
    },
    body: JSON.stringify({
      description: newDescription
    })
  }
} 

function editDescription(){
  id = parseInt(event.target.parentElement.children[0].id)

  fetch(`http://localhost:3000/beers/${id}`, patchObj())
  .then(resp => resp.json())
  .then(beerData => console.log(beerData))
  .catch(err => console.log(err))
}

function submitNewReview(){

  event.preventDefault();
  const review = event.target.children[0].value
  postReview(review);
  event.target.reset();
}

function postReview(review) {
    fetch('http://localhost:3000/beers/1', postObj(review))
    .then(resp => resp.json())
    .then(commentData => {
      const li = `<li>${commentData.comment}</li><button data-id=${commentData.id} class='btn-delete'>Delete</button>`
    ul.innerHTML += li
    })
    .catch(err => console.log(err))
  }
}

description.addEventListener("click", editDescriptionHandler)
reviewInput.addEventListener("submit", submitNewReview)

fetchBeerDeets();