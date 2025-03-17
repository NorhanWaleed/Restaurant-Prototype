document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('تم إرسال رسالتك بنجاح!');
    this.reset();
  });
  