let cartDiv = document.querySelector('#cart-content'); // Cart page container
let cartBadge = document.getElementById('cart-count');  // Navbar cart counter
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];


// let url = 'https://fakestoreapi.com/products';

// if(cart.length > 0){
//     fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         products = data;
//         // renderProducts(); // Data fetch hony k bad display function call
//         updateBadge();    // Initial badge count set kerna
//     });
// } else {
//     renderCartPage(); // Empty cart
//     updateBadge();
// }


// 1. Cart se item remove kerna
let removeFromCart = (id) => {

    // Cart ke har item par loop chala rahe hain
    for (let i = 0; i < cart.length; i++) {

        // Check kar rahe hain ke current item ka id
        // us id ke barabar hai ya nahi jo function ko mila hai
        if (cart[i].id === id) {

            // Agar id match ho jaye to
            // us item ko cart se remove kar do
            // splice(i, 1) ka matlab:
            // index i se 1 item delete karo
            cart.splice(i, 1);

            // Item remove ho chuka hai,
            // is liye loop yahin stop kar dete hain
            break;
        }
    }

    // Updated cart ko localStorage mein save kar rahe hain
    saveCart();

    // Cart page ko dubara render / refresh kar rahe hain
    renderCartPage();
};


// 2. Cart page k ander quantity barhana ya kam kerna
let increaseQty = (id) => {
    // Loop cart ke har item par chalega
    for (let i = 0; i < cart.length; i++) {

        // Check kar rahe hain ke current item ka id
        // us id ke barabar hai ya nahi jo function ko mila hai
        if (cart[i].id === id) { //cart[i].id : mtlab current item ka id, id : mtlab jis product ko hum increase kerna chahte hain

            // Agar id match ho jaye to
            // us specific product ki quantity 1 se increase kar do
            cart[i].qty++;

            // Item mil chuka hai is liye loop ko yahin rok dete hain
            break;
        }
    }

    saveCart();
    renderCartPage();
};

let decreaseQty = (id) => {
    // Cart ke har item par loop chala rahe hain
    for (let i = 0; i < cart.length; i++) {

        // Check kar rahe hain ke current item ka id
        // us id ke barabar hai ya nahi jo function ko mila hai
        if (cart[i].id === id) { //cart[i].id : mtlab current item ka id, id : mtlab jis product ko hum increase kerna chahte hain

            // Agar quantity 1 se zyada hai
            // tab hi quantity ko 1 se decrease karo
            // (taake quantity 0 ya negative na ho)
            if (cart[i].qty > 1) {
                cart[i].qty--;
            }

            // Item mil gaya hai,
            // is liye loop ko yahin stop kar dete hain
            break;
        }
    }

    saveCart();
    renderCartPage();
};

// 3. Cart ka total calculate kerna
let calculateTotal = () => {
    // Total amount ko 0 se start kar rahe hain
    let total = 0;

    // Cart ke har item par loop chala rahe hain
    for (let i = 0; i < cart.length; i++) {

        // Har item ka total nikal rahe hain:
        // price × quantity
        total = total + (cart[i].price * cart[i].qty);
    }

    // Final total amount return kar rahe hain
    return total;
};


// 4. Cart page ka HTML render kerna
let renderCartPage = () => {
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p style="text-align:center; color:black; padding:2rem;">Your cart is empty</p>';
        return;
    }

    const total = calculateTotal();

    let rows = cart.map(item => `
        <tr>
            <td><img src="${item.image}" alt="${item.title}" style="width:50px; 
            color: white;
            height:50px; object-fit:contain"></td>
            <td>${item.title}</td>
            <td>$${item.price}</td>
            <td>
                <div class="qty-control">
                    <button class="qty-btn" onclick="decreaseQty(${item.id})">-</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
                </div>
            </td>
            <td>$${(item.price * item.qty).toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button></td>
        </tr>
    `).join('');

    cartDiv.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Image</th><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th>Action</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
        <div class="summary">
            <h3>Total: $${total.toFixed(2)}</h3>
            <a class="btn" href="checkout.html">Proceed to Checkout</a>
        </div>
    `;
};

// 5. LocalStorage me data save kerna
let saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadge();
};

// 6. Cart badge ka number update kerna
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


// 7. Toast notification
let showToast = (msg) => {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
};

renderCartPage();
updateBadge();
