document.addEventListener("DOMContentLoaded", function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title");
    const author = urlParams.get("author");
    const image = urlParams.get("image");
    const description = urlParams.get("description");

    // Update book details
    document.getElementById("bookTitle").textContent = title || "Unknown Title";
    document.getElementById("bookAuthor").textContent = "By " + (author || "Unknown Author");
    document.getElementById("bookImage").src = image || "placeholder.jpg";
    document.getElementById("bookImage").style.width = "200px"; // Make the book image smaller
    document.getElementById("bookImage").style.height = "auto";
    document.getElementById("bookDescription").textContent = description || "No description available.";

    // Fade-in effect
    setTimeout(() => {
        document.getElementById("bookDetail").style.opacity = 1;
    }, 100);
});

function goBack() {
    window.location.href = "book-page.html"; // Redirects to book page
}

function goToPayment() {
    window.location.href = "payment.html"; // Redirects to payment page
}
