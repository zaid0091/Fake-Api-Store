let checkoutContainer = document.getElementById('checkout-content');
let cartBadge = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];


// 1. Cart ka total calculate kerna
let calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price * cart[i].qty;
    }
    return total;
};

// 2. Checkout screen render kerna
let renderCheckoutPage = () => {
    const total = calculateTotal();
    checkoutContainer.innerHTML = `
        <div class="checkout-box">
            <h2>Order Summary</h2>
            ${cart.map(item => `
                <div class="checkout-item">
                    <img src="${item.image}" alt="${item.title}" style="width:80px; height:80px; object-fit:contain">
                    <p>${item.title}</p>
                    <p>Quantity: ${item.qty}</p>
                    <p>Price: $${item.price}</p>
                </div>
            `).join('')}
            <p>Final Amount: <strong>$${total}</strong></p>
            <button class="btn" onclick="placeOrder()">Confirm Order</button>
        </div>
    `;
};

// 3. Order place kerna or cart clear kerna
let placeOrder = () => {

    if (cart.length === 0) {
        alert("your cart is empty!");
        return;
    }

    let message = "confirm order?\n\nItems:\n";

    for (let i = 0; i < cart.length; i++) {
        message = message + cart[i].title +
            " Quantity: " + cart[i].qty +
            ", $" + (cart[i].price * cart[i].qty) + "\n" + "Total:$ " + (cart[i].price * cart[i].qty) + "\n";
    }

    alert(message); // Order confirmation alert

    cart = []; // Cart empty kar dena
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadge();

    window.location.href = "index.html"; // Home page pe redirect
};


// 4. Cart badge ka number update kerna
let updateBadge = () => {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        count = count + cart[i].qty;
    }
    cartBadge.innerText = count;
};

// 5. Toast notification
let showToast = (msg) => {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
};

renderCheckoutPage();
updateBadge();
