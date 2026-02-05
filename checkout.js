let checkoutContainer = document.getElementById('checkout-content');
let cartBadge = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];


// 1. Cart ka total calculate kerna
let calculateTotal = () => {

    // Total amount ko 0 se start kar rahe hain
    let total = 0;

    // Cart ke har item par loop chala rahe hain
    for (let i = 0; i < cart.length; i++) {

        // Har product ka total nikal rahe hain:
        // price × quantity
        total = total + (cart[i].price * cart[i].qty);
    }

    // Cart ka final total return kar rahe hain
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

// 3. Order place aur cart clear kerna
let placeOrder = () => {

    // Agar cart empty hai to user ko alert karo aur function exit karo
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Order confirmation message
    let message = "Confirm order?\n\nItems:\n";

    // Cart ke har item ka detail message me add kar rahe hain
    for (let i = 0; i < cart.length; i++) {
        message = message + cart[i].title +
                   " Quantity: " + cart[i].qty +
                   ", $" + (cart[i].price * cart[i].qty) + "\n";
    }

    // Total cart value add kar rahe hain
    message = message + "\nTotal: $" + calculateTotal();

    // User ko order confirm karne ke liye alert
    alert(message);

    // Order place hone ke baad cart ko empty kar do
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart)); // localStorage update
    updateBadge(); // Cart badge bhi update karo

    // Order ke baad user ko home page pe redirect karo
    window.location.href = "index.html";
};



// 4. Cart badge ka number update karna
let updateBadge = () => {

    // Cart badge ke liye total items ka count
    let count = 0;

    // Cart ke har item par loop chala rahe hain
    for (let i = 0; i < cart.length; i++) {

        // Har item ki quantity total count me add kar rahe hain
        count = count + cart[i].qty;
    }

    // Cart badge ko update kar rahe hain
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
