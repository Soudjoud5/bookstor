// Function to redirect to the payment page
function goToPayment() {
  window.location.href = "payment.html"; // Replace with your payment page URL
}
function goToPayment(bookTitle) {
  // Redirects the user to the payment page
  window.location.href = `payment.html?book=${encodeURIComponent(bookTitle)}`;
}

// Function to filter books based on search query
function filterBooks() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const books = document.querySelectorAll("#bookList li");

  books.forEach(book => {
      const text = book.innerText.toLowerCase();
      if (text.includes(query)) {
          book.style.display = "block"; // Show matching books
      } else {
          book.style.display = "none"; // Hide non-matching books
      }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // Get the URL parameters
  const params = new URLSearchParams(window.location.search);
  const book = params.get("book"); // Retrieve the 'book' parameter

  // Display the book title on the payment page
  if (book) {
      const bookDetails = document.getElementById("bookDetails");
      bookDetails.textContent = `You are purchasing: ${book}`;
  }
});

