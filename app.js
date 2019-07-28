//Book Class: Represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class: Handels UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class = "btn btn-danger btn-sm delete"> X </a></td>
    `;

    list.appendChild(row);
  }

  // Remove books from the list method
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    //Remove after 3 seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  // Clear field after submit
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

//Storage Class: Handles storage

class Store {
  static getBooks() {
    let booksArray;
    if (localStorage.getItem("books") === null) {
      booksArray = [];
    } else {
      let books = JSON.parse(localStorage.getItem("books"));
      booksArray = Convert.convertObjectToArrary(books);
    }
    return booksArray;
  }

  static addBook(book) {
    const books = Store.getBooks();
    localStorage.setItem("books", JSON.stringify(book));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splic(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

class Convert {
  static convertObjectToArray(obj) {
    const booksArray = Object.keys(obj).map(i => obj[i]);
    return booksArray;
  }
}

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add a book
document.querySelector("#book-form").addEventListener("submit", e => {
  // Prevent actual submit
  e.preventDefault();
  //Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill all fields", "danger");
  } else {
    //Instantiate Book
    const book = new Book(title, author, isbn);

    //Add book to UI
    UI.addBookToList(book);
    //Add book to localStorage
    Store.addBook(book);
    UI.showAlert("Book added successfully !!", "success");
    UI.clearFields();
  }
});

//Event: Remove a book
document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert("Book removed", "success");
});
