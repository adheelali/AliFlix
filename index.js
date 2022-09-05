const cardListEl = document.querySelector('.card-list')
const buttonEl = document.querySelector('.button')
const inputEl = document.querySelector('.input')
const searchedEl = document.querySelector('.movie__searched--name')
let executed = false;
let inputSearch = false;


function onSearchMovie(event) {
  const movieData = event.target.value;
  searchedEl.innerHTML = movieData 
  inputSearch = true;
  executed = true;
  search(movieData);
} 

function search(movieData) {
  if (executed) {
    main(movieData);
  }
  
  executed = false
  
  if (!inputSearch) {
    inputEl.classList += ' input-shake'
    buttonEl.classList += ' input-shake'
  }

  setTimeout(() => {
    inputEl.classList.remove('input-shake')
    buttonEl.classList.remove('input-shake')
  }, 600);

  setTimeout(() => {
    inputSearch = false
  }, 700);
}

async function main(movieData) {
    const data = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=c968a92&s=${movieData}`);
    const jsonData = await data.json();
    console.log(jsonData)
    cardListEl.innerHTML = jsonData.Search.map((movie) => cardHTML(movie)).join('');
}  
main();


function cardHTML(movie) {
   return `
   <div class="card">
    <figure class="card__img--wrapper">
    <img src="${movie.poster}" />
    </figure>
    <div class="card__info">
      <h2 class="card__title">Title: ${movie.title}</h2>
      <h3 class="card__type">Type: ${movie.type}</h2>
      <h3 class="card__year">Year: ${movie.year}</h3>
    </div>  
  </div>  `
}