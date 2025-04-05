const ADMIN_PASSWORD = "admin123";

function checkAccess() {
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("loginPrompt").style.display = "block";
}

function verifyPassword() {
  const input = document.getElementById("adminPass").value;
  if (input === ADMIN_PASSWORD) {
    document.getElementById("loginPrompt").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadBooks();
    loadStats();
  } else {
    alert("Incorrect password!");
  }
}

function loadBooks() {
  const bookList = JSON.parse(localStorage.getItem("books")) || [];
  const container = document.getElementById("bookList");
  container.innerHTML = "";

  bookList.forEach((book, index) => {
    const div = document.createElement("div");
    div.className = "book-item";
    div.innerHTML = `<strong>${book.name}</strong> by ${book.author} 
      <button onclick="deleteBook(${index})">🗑️ Delete</button>`;
    container.appendChild(div);
  });
}

function addBook() {
  const name = document.getElementById("bookName").value.trim();
  const author = document.getElementById("authorName").value.trim();
  if (!name || !author) return alert("Please enter book name and author.");

  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.push({ name, author });
  localStorage.setItem("books", JSON.stringify(books));

  document.getElementById("bookName").value = "";
  document.getElementById("authorName").value = "";
  loadBooks();
  loadStats();
}

function deleteBook(index) {
  const books = JSON.parse(localStorage.getItem("books"));
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  loadBooks();
  loadStats();
}

function resetBooks() {
  if (confirm("Are you sure you want to delete all books?")) {
    localStorage.removeItem("books");
    loadBooks();
    loadStats();
  }
}

function resetFines() {
  if (confirm("Are you sure you want to reset all fine records?")) {
    localStorage.removeItem("fineRecords");
    loadStats();
  }
}

function loadStats() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const fines = JSON.parse(localStorage.getItem("fineRecords")) || [];
  let totalFine = 0;
  fines.forEach(f => totalFine += f.fineAmount);
  document.getElementById("totalBooks").innerText = books.length;
  document.getElementById("totalFines").innerText = totalFine;
}

function exportData() {
  const books = localStorage.getItem("books");
  const fines = localStorage.getItem("fineRecords");
  const data = {
    books: JSON.parse(books) || [],
    fineRecords: JSON.parse(fines) || []
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "library-data.json";
  link.click();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const result = JSON.parse(e.target.result);
    if (result.books) localStorage.setItem("books", JSON.stringify(result.books));
    if (result.fineRecords) localStorage.setItem("fineRecords", JSON.stringify(result.fineRecords));
    alert("Data imported successfully!");
    loadBooks();
    loadStats();
  };
  reader.readAsText(file);
}
window.onload = () => {
  // Load access check
  checkAccess();

  // Add sample books if none exist
  const books = JSON.parse(localStorage.getItem("books"));
  if (!books || books.length === 0) {
    const sampleBooks = [
      { name: "The Alchemist", author: "Paulo Coelho" },
      { name: "Sapiens", author: "Yuval Noah Harari" },
      { name: "Clean Code", author: "Robert C. Martin" }
    ];
    localStorage.setItem("books", JSON.stringify(sampleBooks));
  }

  // Add sample fine records
  const fines = JSON.parse(localStorage.getItem("fineRecords"));
  if (!fines || fines.length === 0) {
    const demoFines = [
      {
        bookName: "Sapiens",
        takenDate: "2025-03-15",
        dueDate: "2025-03-25",
        returnedDate: "2025-03-30",
        fineAmount: 50
      },
      {
        bookName: "Clean Code",
        takenDate: "2025-03-10",
        dueDate: "2025-03-20",
        returnedDate: "2025-03-29",
        fineAmount: 90
      }
    ];
    localStorage.setItem("fineRecords", JSON.stringify(demoFines));
  }
};
