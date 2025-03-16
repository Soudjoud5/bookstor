document.addEventListener("DOMContentLoaded", function () {
  // Function to filter books based on search input
  document.getElementById("searchBar").addEventListener("keyup", function () {
      let filter = this.value.toLowerCase();
      let books = document.querySelectorAll(".book-card");
      
      books.forEach(book => {
          let title = book.querySelector("h3").textContent.toLowerCase();
         
          
          if (title.includes(filter) ) {
              book.style.display = "block";
          } else {
              book.style.display = "none";
          }
      });
  });
});

// Function to navigate to the book details page
function goToBookDetails(page) {
  window.location.href = page;
}
