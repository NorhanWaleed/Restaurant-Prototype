document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.querySelector('.order-summary');
  const subtotalEl = document.querySelector('.order-totals .total-row:nth-child(1) span:last-child');
  const deliveryFeeEl = document.querySelector('.order-totals .total-row:nth-child(2) span:last-child');
  const taxEl = document.querySelector('.order-totals .total-row:nth-child(3) span:last-child');
  const totalEl = document.querySelector('.order-totals .total-row:nth-child(4) span:last-child');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutBtn = document.getElementById('checkout-btn');
  const DELIVERY_FEE = 30;

  const isLoggedIn = localStorage.getItem('loggedInUser') !== null;

  if (!isLoggedIn && checkoutForm) {
    checkoutForm.innerHTML = `
      <div class="alert alert-warning">
        <h4><i class="fas fa-lock me-2"></i>Login Required</h4>
        <p>Please <a href="login.html">login</a> or <a href="register.html">register</a> to complete your checkout.</p>
      </div>`;
  }

  const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
  const saveCart = cart => localStorage.setItem('cart', JSON.stringify(cart));

  const validateFormFields = () => {
    const firstName = document.getElementById('checkout-firstname')?.value.trim();
    const lastName = document.getElementById('checkout-lastname')?.value.trim();
    const phone = document.getElementById('checkout-phonenumber')?.value.trim();
    const address = document.getElementById('checkout-address')?.value.trim();

    if (!firstName || !lastName || !phone || !address) {
      alert('Please fill in all the required fields.');
      return false;
    }

    return true;
  };

  const extractPriceNumber = priceString => {
    const matches = priceString.match(/(\d+(\.\d+)?)/);
    return matches ? parseFloat(matches[0]) : 0;
  };

  const calculateItemTotal = item => {
    const priceNumber = extractPriceNumber(item.price);
    return `L.E ${(priceNumber * item.quantity).toFixed(2)}`;
  };

  const calculateTotals = () => {
    const cart = getCart();
    const subtotal = cart.reduce((total, item) => {
      const priceNumber = extractPriceNumber(item.price);
      return total + (priceNumber * item.quantity);
    }, 0);

    const tax = subtotal * 0.14;
    const total = subtotal + DELIVERY_FEE + tax;
    const currentSubtotalEl = document.querySelector('.order-totals .total-row:nth-child(1) span:last-child');
    const currentTaxEl = document.querySelector('.order-totals .total-row:nth-child(3) span:last-child');
    const currentTotalEl = document.querySelector('.order-totals .total-row:nth-child(4) span:last-child');
    
    if (currentSubtotalEl) currentSubtotalEl.textContent = `EGP ${subtotal.toFixed(2)}`;
    if (currentTaxEl) currentTaxEl.textContent = `EGP ${tax.toFixed(2)}`;
    if (currentTotalEl) currentTotalEl.textContent = `EGP ${total.toFixed(2)}`;
    if (subtotalEl) subtotalEl.textContent = `EGP ${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `EGP ${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `EGP ${total.toFixed(2)}`;
  };

  const setupCartEventListeners = () => {
    document.querySelectorAll('.btn-add').forEach(button => {
      button.addEventListener('click', e => {
        const orderItem = e.target.closest('.order-item');
        const id = +orderItem.getAttribute('data-id');
        let cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
          item.quantity += 1;
          saveCart(cart);
          renderCart();
        }
      });
    });

    document.querySelectorAll('.btn-subtract').forEach(button => {
      button.addEventListener('click', e => {
        const orderItem = e.target.closest('.order-item');
        const id = +orderItem.getAttribute('data-id');
        let cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
          saveCart(cart);
          renderCart();
        }
      });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', e => {
        const orderItem = e.target.closest('.order-item');
        const id = +orderItem.getAttribute('data-id');
        let cart = getCart();
        cart = cart.filter(item => item.id !== id);
        saveCart(cart);
        orderItem.remove();
        calculateTotals();
        
        if (cart.length === 0) {
          cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        }
      });
    });
  };

  const renderCart = () => {
    const cart = getCart();
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    const titleElement = document.createElement('h3');
    titleElement.className = 'section-title';
    titleElement.textContent = 'Order Summary';
    cartContainer.appendChild(titleElement);

    cart.forEach(item => {
      cartContainer.innerHTML += `
        <div class="order-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="item-image">
          <div class="item-details">
            <div class="item-name">${item.name}</div>
            <div class="item-price">${item.price}</div>
          </div>
          <div class="item-quantity">
            <button class="quantity-btn btn-subtract">-</button>
            <input type="text" value="${item.quantity}" class="quantity-input" readonly>
            <button class="quantity-btn btn-add">+</button>
          </div>
          <div class="item-total">${calculateItemTotal(item)}</div>
          <button class="remove-btn"><i class="fas fa-trash"></i></button>
        </div>
      `;
    });

    calculateTotals();
    setupCartEventListeners();
  };

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', e => {
      e.preventDefault();
      
      if (!validateFormFields()) return;
      
      const cart = getCart();
      if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
      }

      alert('Order placed successfully!');
      saveCart([]);
      window.location.href = 'index.html';
    });
  }

  renderCart();
});