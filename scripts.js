const form = document.querySelector("#readBook");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const showArea = document.querySelector("#displayBooks");
const bookLibrary = document.querySelector("#bookLibrary");
const listbooks = document.querySelector("#listbooks");
const contactInfo = document.querySelector("#contactpage");

const today = document.querySelector(".today-date");
class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  dataStorage() {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const book = new Books(bookTitle, bookAuthor);
    if (localStorage.getItem("books") === null) {
      const bookStore = [];
      bookStore.push(book);
      localStorage.setItem("books", JSON.stringify(bookStore));
    } else {
      const bookStorage = localStorage.getItem("books");
      const bookArray = JSON.parse(bookStorage);
      bookArray.push(book);
      localStorage.setItem("books", JSON.stringify(bookArray));
    }

    title.value = "";
    author.value = "";
    this.dotiBooks();
  }

  dotiBooks() {
    const wrapper = document.createElement("div");
    const hline = document.createElement("hr");
    const bookStorage = localStorage.getItem("books");
    const dotion = document.createElement("div");
    dotion.innerText = this.author;
    const bookArray = JSON.parse(bookStorage);
    bookArray.forEach((element, index) => {
      const heading = document.createElement("h1");
      const displayTitle = document.createElement("p");
      const displayAuthor = document.createElement("p");
      const delbtn = document.createElement("div");
      const container = document.createElement("div");
      const senti = document.createElement("div");
      displayTitle.innerText = `"${element.title}" by`;
      displayAuthor.innerText = element.author;
      delbtn.innerHTML = `<button class="btn outer" onclick='deleteItem(${index})'>Remove</button>`;
      delbtn.classList.add("deleteBook");
      container.classList.add("library", "middle");
      senti.classList.add("library");
      displayAuthor.classList.add("letter");
      senti.appendChild(displayTitle);
      senti.appendChild(displayAuthor);
      container.appendChild(senti);
      container.appendChild(delbtn);
      wrapper.appendChild(container);
    });
    hline.classList.add("hline");
    showArea.appendChild(wrapper);
    showArea.appendChild(hline);
  }

  removeBook(index) {
    const bookStorage = localStorage.getItem("books");
    const bookArray = JSON.parse(bookStorage);
    bookArray.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(bookArray));
    showArea.innerHTML = "";
    this.dotiBooks();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  showArea.innerHTML = "";
  const book = new Books();
  book.dataStorage();
});

const addedBook = new Books();
const deleteItem = (id) => {
  addedBook.removeBook(id);
};
// display and hide page sections
showArea.classList.add("hidden");
listbooks.addEventListener("click", () => {
  showArea.classList.remove("hidden");
  addbooks.style.display = "none";
  contactSection.style.display = "none";
});
const contactSection = document.querySelector(".info-section");
contactInfo.addEventListener("click", function () {
  contactSection.classList.remove("hidden");
  contactSection.style.display = "flex";
  showArea.classList.add("hidden");
  addbooks.classList.add("hidden");
});
const newbook = document.querySelector("#newbook");
newbook.addEventListener("click", function () {
  contactSection.style.display = "none";
  showArea.classList.add("hidden");
  addbooks.style.display = "flex";
});
// add book section
const addbooks = document.querySelector(".addbooks");
// today = new Date();

window.addEventListener("load", addedBook.dotiBooks());
