document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('registerEmail')?.value.trim();
    const password = document.getElementById('registerPassword')?.value.trim();
  
    if (localStorage.getItem(email)) {
      alert('Email already registered.');
      return;
    }
  
    localStorage.setItem(email, JSON.stringify({ email, password }));
    localStorage.setItem('loggedInUser', email);
    alert('Registration successful!');
    window.location.href = 'index.html';
  });
  
