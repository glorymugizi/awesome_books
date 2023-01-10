/* eslint-disable no-unused-vars */
const form = document.querySelector('#readBook');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const showArea = document.querySelector('#displayBooks');

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  dataStorage() {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const book = new Books(bookTitle, bookAuthor);
    if (localStorage.getItem('books') === null) {
      const bookStore = [];
      bookStore.push(book);
      localStorage.setItem('books', JSON.stringify(bookStore));
    } else {
      const bookStorage = localStorage.getItem('books');
      const bookArray = JSON.parse(bookStorage);
      bookArray.push(book);
      localStorage.setItem('books', JSON.stringify(bookArray));
    }

    title.value = '';
    author.value = '';
    this.dotiBooks();
  }

  dotiBooks() {
    const wrapper = document.createElement('div');
    const hline = document.createElement('hr');
    const bookStorage = localStorage.getItem('books');
    const dotion = document.createElement('div');
    dotion.innerText = this.author;
    const bookArray = JSON.parse(bookStorage);
    bookArray.forEach((element, index) => {
      const displayTitle = document.createElement('p');
      const displayAuthor = document.createElement('p');
      const delbtn = document.createElement('div');
      const container = document.createElement('div');
      const senti = document.createElement('div');
      displayTitle.innerText = `"${element.title}" by`;
      displayAuthor.innerText = element.author;
      delbtn.innerHTML = `<button class="btn outer" onclick='deleteItem(${index})'>Remove</button>`;
      delbtn.classList.add('deleteBook');
      container.classList.add('library', 'middle');
      senti.classList.add('library');
      displayAuthor.classList.add('letter');
      senti.appendChild(displayTitle);
      senti.appendChild(displayAuthor);
      container.appendChild(senti);
      container.appendChild(delbtn);
      wrapper.appendChild(container);
    });
    hline.classList.add('hline');
    showArea.appendChild(wrapper);
    showArea.appendChild(hline);
  }

  removeBook(index) {
    const bookStorage = localStorage.getItem('books');
    const bookArray = JSON.parse(bookStorage);
    bookArray.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookArray));
    showArea.innerHTML = '';
    this.dotiBooks();
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (title.value === '') {
    alert('Please enter a book title');
  } else if (author.value === '') {
    alert('Please enter a book author');
  } else {
    showArea.innerHTML = '';
    const book = new Books();
    book.dataStorage();
  }
});

const addedBook = new Books();
const deleteItem = (id) => {
  addedBook.removeBook(id);
};

window.addEventListener('load', addedBook.dotiBooks());
