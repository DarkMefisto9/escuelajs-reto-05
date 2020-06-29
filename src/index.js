const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/?page=';

const getData = (api, page) => {
  fetch(`${api}${page}`)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      const totalPages = response.info.pages;

      if (page == totalPages) {
        intersectionObserver.unobserve($observe);

        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML += `
        <article class="Card">
          <H1>Ya no hay mas personajes...</H1>
        </article>
      `;
        $app.appendChild(newItem);
      } else {
        let output = characters.map(character => {
          return `
        <article class="Card">
          <img src="${character.image}" />
          <h2>${character.id} - ${character.name}<span>${character.species}</span></h2>
        </article>
      `
        }).join('');
        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output;
        $app.appendChild(newItem);
      }
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  var savePage = 0
  const changePage = () => {
    savePage++;
    //Issue 1.1 - 1.2
    localStorage.setItem("next_fetch", savePage)
    //Issue 1.3
    console.log(localStorage["next_fetch"]);
    //Issue 2.1
    getData(API, localStorage["next_fetch"]);
  }
  return changePage;


}

const pageChanger = loadData()

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    pageChanger()
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);