class AuthController {
  constructor() {
    this.init();
  }

  init() {
    this.updateUI();
    this.setupEventListeners();
    this.updateCartCount();
  }

  isLoggedIn = () => !!localStorage.getItem('loggedInUser');

  getCurrentUser = () => {
    try {
      const email = localStorage.getItem('loggedInUser');
      return email ? JSON.parse(localStorage.getItem(email) ?? '{}') : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  logout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
  };

  updateUI = () => {
    const authButtonsContainer = document.querySelector('.auth-buttons');
    if (!authButtonsContainer) return;

    if (this.isLoggedIn()) {
      const user = this.getCurrentUser();
      authButtonsContainer.innerHTML = `
        <div class="user-welcome">Welcome, ${user?.name}</div>
        <button class="btn btn-logout">Logout</button>
      `;

      document.querySelector('.btn-logout')?.addEventListener('click', this.logout);
    } else {
      authButtonsContainer.innerHTML = `
        <a href="login.html" class="btn home-login-btn rounded">Login</a>
        <a href="register.html" class="btn home-register-btn rounded">Register</a>
      `;
    }
  };

  setupEventListeners = () => {
    this.protectWishlistActions();
    this.protectCheckoutActions();
  };

  protectWishlistActions = () => {
    document.querySelectorAll('.add-to-wishlist').forEach(btn =>
      btn.addEventListener('click', (e) => {
        if (!this.isLoggedIn()) {
          e.preventDefault();
          alert('Please login to add items to your wishlist');
        }
      })
    );
  };

  protectCheckoutActions = () => {
    document.querySelector('.checkout-btn')?.addEventListener('click', (e) => {
      if (!this.isLoggedIn()) {
        e.preventDefault();
        alert('Please login to complete your order');
      } else {
        alert('Order placed successfully!');
        localStorage.setItem('cart', JSON.stringify([]));
        this.updateCartCount();
        window.location.href = 'index.html';
      }
    });
  };
}

document.addEventListener('DOMContentLoaded', () => {
  window.authController = new AuthController();
});
