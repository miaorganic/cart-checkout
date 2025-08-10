let cart = [];
let total = 0;

// Add item to cart
function addToCart(product, price) {
  cart.push({ product, price });
  total += price;
  displayCart();
}

// Show cart contents
function displayCart() {
  const cartList = document.getElementById('cart');
  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.product} - $${item.price}`;
    cartList.appendChild(li);
  });
  document.getElementById('total').textContent = `Total: $${total}`;
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderDetails = {
    cart: cart,
    total: total
  };

  // Send order to your webhook
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
    displayCart();
  })
  .catch(err => {
    console.error(err);
    alert("Error placing order");
  });
}

