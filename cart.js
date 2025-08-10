let cart = JSON.parse(localStorage.getItem('store_cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

function saveCart() {
  localStorage.setItem('store_cart', JSON.stringify(cart));
}

function displayCart() {
  const cartList = document.getElementById('cart');
  cartList.innerHTML = "";
  total = 0;

  cart.forEach(item => {
    const qty = item.qty || 1;
    total += item.price * qty;

    const li = document.createElement('li');
    li.textContent = `${item.product || item.name} - $${item.price} × ${qty}`;
    cartList.appendChild(li);
  });

  document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function addToCart(product, price) {
  let existing = cart.find(item => item.product === product || item.name === product);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ product, price, qty: 1 });
  }
  saveCart();
  displayCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderDetails = {
    cart: cart,
    total: total
  };

  fetch("YOUR_WEBHOOK_URL", {
    method: "POST",
    body: JSON.stringify(orderDetails),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => {
    alert("Order placed successfully!");
    cart = [];
    total = 0;
    saveCart();
    displayCart();
  })
  .catch(err => {
    console.error(err);
    alert("Error placing order");
  });
}

// On page load, display cart from localStorage
window.onload = displayCart;

