document.getElementById('contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!e.target.checkValidity()) {
    alert('Please fill out all required fields.');
    return;
  }

  alert('Your message has been sent!');
  e.target.reset();
});
