const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

// Updates the cart icon count based on total quantity of items
const updateCartCount = () => {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(element => {
    element.textContent = count;
  });
};

// Add item to cart or increase its quantity if it already exists
const addToCart = (item) => {
  let cart = getCart();
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }
  saveCart(cart);
  updateCartCount();
};

// Remove item from cart
const removeFromCart = (itemId) => {
  let cart = getCart();
  cart = cart.filter(item => item.id !== itemId);
  saveCart(cart);
  updateCartCount();
};

// Update item quantity in cart
const updateCartItemQuantity = (itemId, quantity) => {
  let cart = getCart();
  const item = cart.find(item => item.id === itemId);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      saveCart(cart);
      updateCartCount();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});