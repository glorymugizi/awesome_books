const form = document.querySelector('#readBook');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const showArea = document.querySelector('#displayBooks');
const listbooks = document.querySelector('#listbooks');
const contactInfo = document.querySelector('#contactpage');
const contactSection = document.querySelector('.info-section');
const newbook = document.querySelector('#newbook');
const addbooks = document.querySelector('.addbooks');
const dates = document.querySelector('#date');

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
    const heading = document.createElement('h1');
    heading.innerHTML = 'All awesome books';
    heading.classList.add('heading');
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
      delbtn.innerHTML = `<button class="btn outer" onclick='addedBook.removeBook(${index})'>Remove</button>`;
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
    showArea.appendChild(heading);
    showArea.appendChild(wrapper);
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

  showArea.innerHTML = '';
  const book = new Books();
  book.dataStorage();
});

// display and hide page sections
showArea.classList.add('hidden');
listbooks.addEventListener('click', () => {
  showArea.classList.remove('hidden');
  addbooks.style.display = 'none';
  contactSection.style.display = 'none';
});

contactInfo.addEventListener('click', () => {
  contactSection.classList.remove('hidden');
  contactSection.style.display = 'flex';
  showArea.classList.add('hidden');
  addbooks.style.display = 'none';
});

newbook.addEventListener('click', () => {
  contactSection.style.display = 'none';
  showArea.classList.add('hidden');
  addbooks.style.display = 'flex';
});

dates.innerHTML = Date();

const addedBook = new Books();

window.addEventListener('load', addedBook.dotiBooks());
