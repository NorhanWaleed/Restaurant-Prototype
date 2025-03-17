/**
 * Handles the login functionality for the application.
 * Listens for the DOM content to load before attaching the event listener.
 */

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) return; 

  loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); 

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      const userData = localStorage.getItem(email);

      if (!userData) {
          alert("User not found. Please register first.");
          return;
      }
      const user = JSON.parse(userData);

      if (user.password === password) {
          localStorage.setItem("loggedInUser", email);
          window.location.href = "index.html";
      } else {
          alert("Incorrect password. Please try again.");
      }
  });
});

  