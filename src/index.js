// Code here
const beerContainer = document.querySelector(".beer-details");


//// FETCH BEER INFO ////
fetch("http://localhost:3000/beers/1")
  .then((resp) => resp.json())
  .then((beerData) => renderAllData(beerData))
  .catch((err) => console.log(err));

function renderAllData(beerData) {    
const reviews = beerData.reviews
  .map((review) => {
    return `<li>${review}</li>`;
  })
  .join(" ");
  //this breaks up the array of reviews into individual li
const beerDiv = ` 
  <div class="beer-details">
    <h2>${beerData.name}</h2>
    <img src="${beerData.image_url}">
    <form class="description">
      <textarea class="text-area">${beerData.description}</textarea>
      <button class="update-button">Update Beer</button>
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
  </div>
`;
  beerContainer.innerHTML = beerDiv;
  //this goes into the beer-details div to update the information from json
}
//// UPDATE BEER DESCRIPTION ///
function updateDescription() {
  if (event.target.className === 'update-button') {
    const newDesc = event.target.parentElement.children[0].innerText;
    descJson(newDesc);
    location.reload();
  }
  function descJson(description) {
    fetch("http://localhost:3000/beers/1", patchObj(description))
      .then((resp) => resp.json())
      .then((descData) => console.log(descData))
      .catch((err) => console.log(err));
  }
  function patchObj(desc) {
    return {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        description: desc
      })
    }
  }
}

//// POST REVIEW INFO ////

function handleReview() {
  event.preventDefault();
  const newReview = event.target.reviews;
  createReview(newReview);
  location.reload();
}
function createReview(review) {
  fetch("http://localhost:3000/beers/1", showObj(review))
  .then((resp) => resp.json())
  .then((beerData) => renderAllData(beerData))
  .catch((err) => console.log(err));
}
function showObj(review) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: review,
    }),
  };
}

//// EVENT LISTENERS ////
beerContainer.addEventListener('submit', handleReview);
beerContainer.addEventListener('click',updateDescription);