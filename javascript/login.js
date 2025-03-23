document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value.trim();
  
    const userData = localStorage.getItem(email);
    if (!userData) {
      alert('User not found. Please register first.');
      return;
    }
  
    const user = JSON.parse(userData);
    if (user.password === password) {
      localStorage.setItem('loggedInUser', email);
      window.location.href = 'index.html';
    } else {
      alert('Incorrect password.');
    }
  });
  

  