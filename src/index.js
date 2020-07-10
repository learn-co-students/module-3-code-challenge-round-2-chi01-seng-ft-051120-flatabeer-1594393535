// Code here
const beerDetails = document.querySelector(".beer-details");

///////////////////////////// FETCH BEER
function fetchBeer() {
  fetch("http://localhost:3000/beers/1")
    .then((resp) => resp.json())
    .then((beerData) => renderBeer(beerData))
    .catch((err) => console.log(err));
}

function renderBeer(beerData) {
  console.log(beerData);
  const reviews = beerData.reviews
    .map((review) => {
      return `<li>${review}</li>`;
    })
    .join("");

  const div = `<div class="beer-details">
  <h2>${beerData.name}</h2>
  <img src=${beerData.image_url}">

  <form class="description">
    <textarea>${beerData.description}</textarea>
    <button>Update Beer</button>
  </form>

  <h3>Leave a Review</h3>
  <form class="review-form">
    <textarea></textarea>
    <input type="submit" value="Submit">
  </form>

  <h3>Customer Reviews</h3>
  <ul class="reviews">
    ${reviews}
  </ul>
</div>`;

  beerDetails.innerHTML = div;
}

///////////////////////////// CHANGE DESCRIPTION
function changeDescription() {
  if (event.target.tagName === "BUTTON") {
    event.preventDefault();
    const description = event.target.parentElement.children[0].value;
    changeDescriptionBackend(description);
  }
}
function changeDescriptionBackend(description) {
  fetch("http://localhost:3000/beers/1", patchObj(description))
    .then((resp) => resp.json())
    .then(() => fetchBeer())
    .catch((err) => console.log(err));
}
function patchObj(description) {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      description: description,
    }),
  };
}
///////////////////////////// ADD REVIEW
function addReview() {
  if (event.target.className === "review-form") {
    event.preventDefault();
    const review = event.target.children[0].value;
    event.target.reset();

    addReviewBackend(review);
  }
}

function addReviewBackend(review) {
  fetch("http://localhost:3000/beers/1", patchObj2(review))
    .then((resp) => resp.json())
    .then(() => fetchBeer())
    .catch((err) => console.log(err));
}
function patchObj2(review) {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /* was trying to find a way to retain original array of reviews and
       append new review: 
       beerDetails.reviews.push(review)?
       or maybe a for loop? */
      reviews: review,
    }),
  };
}

///////////////////////////// EVENT LISTENERS
beerDetails.addEventListener("click", changeDescription);
beerDetails.addEventListener("submit", addReview);

///////////////////////////// INVOKE FUNCTIONS
fetchBeer();
