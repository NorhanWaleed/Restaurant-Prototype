/**
 * Handles user registration.
 * Saves user details in local storage and prevents duplicate accounts.
 */

document.addEventListener("DOMContentLoaded", function () {

  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const name = document.getElementById("name").value.trim();
          const email = document.getElementById("registerEmail").value.trim();
          const password = document.getElementById("registerPassword").value.trim();


          if (localStorage.getItem(email)) {
              alert("This email is already registered. Please use a different email or log in.");
              return;
          }

          const user = { name, email, password };
          localStorage.setItem(email, JSON.stringify(user));

          alert("Registration successful! You can now log in.");
          window.location.href = "index.html";
      });
  }
});
