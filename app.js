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
    const storedBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "2343443"
      },
      {
        title: "Book Two",
        author: "Jane Doe",
        isbn: "6788678"
      }
    ];

    const books = storedBooks;
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
}

//Storage Class: Handles storage

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);
//Event: Add a book

//Event: Remove a book
