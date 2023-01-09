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