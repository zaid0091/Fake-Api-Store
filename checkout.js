let checkoutContainer = document.getElementById('checkout-content');
let cartBadge = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];


// 1. Cart ka total calculate karna
let calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total = total + (cart[i].price * cart[i].qty);
    }

    return total;
};

// 2. Checkout screen render karna
let renderCheckoutPage = () => {
    const total = calculateTotal();
    checkoutContainer.innerHTML = `
        <div class="checkout-box">
            <h2>Order Summary</h2>
            <div class="checkout-list">
                ${cart.map(item => `
                    <div class="checkout-item">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="item-details">
                            <p><strong>${item.title}</strong></p>
                            <p>Qty: ${item.qty} | $${item.price}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <p class="total-price">Final Amount: <strong>$${total.toFixed(2)}</strong></p>
            <button class="confirm-btn" onclick="placeOrder()">Confirm Order</button>
        </div>
    `;
};

// 3. Order place aur cart clear karna
let placeOrder = () => {

    // Agar cart empty hai
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(cart); 

    localStorage.setItem('orders', JSON.stringify(orders));
    // Order confirmation message
    // let message = "Confirm order?\n\nItems:\n";

    // // Cart ke har item ka detail message me add kar rahe hain
    // for (let i = 0; i < cart.length; i++) {
    //     message = message + cart[i].title +
    //                " Quantity: " + cart[i].qty +
    //                ", $" + (cart[i].price * cart[i].qty) + "\n";
    // }

    // // Total cart value add kar rahe hain
    // message = message + "\nTotal: $" + calculateTotal();

    // // User ko order confirm karne ke liye alert
    // alert(message);

    // Order place hone ke baad cart ko empty kar do
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateBadge(); 
    alert("Order placed successfully!");

    // Order ke baad user ko home page pe redirect karo
    window.location.href = "index.html";
};



// 4. Cart badge ka number update karna
let updateBadge = () => {
    let count = 0;

    for (let i = 0; i < cart.length; i++) {

        // Har item ki quantity total count me add kar rahe hain
        count = count + cart[i].qty;
    }

    cartBadge.innerText = count;
};


renderCheckoutPage();
updateBadge();
