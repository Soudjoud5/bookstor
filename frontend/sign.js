document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents form from submitting immediately

        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Email validation using regex
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Username validation (minimum 3 characters)
        if (username.length < 3) {
            alert("Username must be at least 3 characters long.");
            return;
        }

        // Password validation (minimum 6 characters)
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Store user data in local storage
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);

        // Redirect to books page after successful sign-in
        window.location.href = "books.html";
    });
});
