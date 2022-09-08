const cardListEl = document.querySelector(".card-list");
const buttonEl = document.querySelector(".button");
const inputEl = document.querySelector(".input");
const searchedEl = document.querySelector(".movie__searched--name");
const spinnerEl = document.querySelector(".fa-spinner");
const movieNotFoundEl = document.querySelector(".not-found__img--wrapper");
let executed = false;
let inputSearch = false;

function onSearchMovie(event) {
  const movieData = event.target.value;
  searchedEl.innerHTML = movieData;
  inputSearch = true;
  executed = true;
  spinnerEl.classList += " display-block";
  // movieNotFoundEl.classList.remove('display-block')
  search(movieData);
}

function search(movieData) {
  if (executed) {
    main(movieData);
  }

  executed = false;

  // input properties

  if (!inputSearch) {
    inputEl.classList += " input-shake";
    buttonEl.classList += " input-shake";
  }
  setTimeout(() => {
    inputEl.classList.remove("input-shake");
    buttonEl.classList.remove("input-shake");
  }, 600);
  setTimeout(() => {
    inputSearch = false;
  }, 700);
}

async function main(movieData) {
  const data = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=c968a92&s=${movieData}`
  );
  const jsonData = await data.json();
  console.log(jsonData);
  spinnerEl.classList.remove("display-block");
  cardListEl.innerHTML = jsonData.Search.map((movie) => cardHTML(movie)).join(
    ""
  );
  if (jsonData.Response = "False") {
    movieNotFoundEl.classList += " display-block";
  }
}

function cardHTML(movie) {
  return `
   <div class="card">
    <figure class="card__img--wrapper">
     <img class="card__img" src="${movie.Poster}" />
    </figure>
    <div class="card__info">
      <h2 class="card__title">Title: ${movie.Title}</h2>
      <h3 class="card__type">Type: ${movie.Type}</h2>
      <h3 >Year: ${movie.Year}</h3>
    </div>  
   </div>  `;
}
