// Read cart from localStorage
let cart = JSON.parse(localStorage.getItem('store_cart')) || [];

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const totalEl = document.getElementById('totalText'); // Adjust ID to your total display element
  
  if (!container) return; // Make sure element exists
  
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    totalEl.textContent = 'Rs. 0';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    // Create display row (adjust to your HTML structure)
    const row = document.createElement('div');
    row.textContent = `${item.name} — Rs. ${item.price} × ${item.qty} = Rs. ${itemTotal}`;
    container.appendChild(row);
  });

  totalEl.textContent = 'Rs. ' + total;
}

// Call this once when cart page loads
window.onload = renderCart;


