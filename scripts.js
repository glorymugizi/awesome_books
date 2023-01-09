const form = document.querySelector('#readBook');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const showArea = document.querySelector('#displayBooks');

function dotiBooks() {
  const wrapper = document.createElement('div');
  const bookStorage = localStorage.getItem('books');
  const bookArray = JSON.parse(bookStorage);
  bookArray.forEach((element, index) => {
    const displayTitle = document.createElement('p');
    const showAuthor = document.createElement('p');
    const delbtn = document.createElement('div');
    const container = document.createElement('div');
    const hline = document.createElement('hr');
    displayTitle.innerText = element.title;
    showAuthor.innerText = element.author;
    delbtn.innerHTML = `<button onclick='removeBook(${index})'>Remove</button>`;
    delbtn.classList.add('deleteBook');
    container.appendChild(displayTitle);
    container.appendChild(showAuthor);
    container.appendChild(delbtn);
    container.appendChild(hline);
    wrapper.appendChild(container);
  });
  showArea.appendChild(wrapper);
}
/* Take the data store it  */
const storeObj = {};
function dataStorage() {
  if (localStorage.getItem('books') === null) {
    const bookStore = [];
    bookStore.push(storeObj);
    localStorage.setItem('books', JSON.stringify(bookStore));
  } else {
    const bookStorage = localStorage.getItem('books');
    const bookArray = JSON.parse(bookStorage);
    bookArray.push(storeObj);
    localStorage.setItem('books', JSON.stringify(bookArray));
  }
  title.value = '';
  author.value = '';
  dotiBooks();
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  storeObj.title = title.value;
  storeObj.author = author.value;
  showArea.innerHTML = '';
  dataStorage();
});
function removeBook(index) {
  const bookStorage = localStorage.getItem('books');
  const bookArray = JSON.parse(bookStorage);
  bookArray.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(bookArray));
  showArea.innerHTML = '';
  dotiBooks();
}

window.addEventListener('load', dotiBooks);

if ('cl' === 'clz') {
  removeBook(1);
}