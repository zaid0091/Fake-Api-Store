let cartDiv = document.querySelector('#cart-content');
let cartBadge = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];


// let url = 'https://fakestoreapi.com/products';

// if(cart.length > 0){
//     fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         products = data;
//         // renderProducts(); // Data fetch hony k bad display function call
//         updateBadge();    // Initial badge count set karna
//     });
// } else {
//     renderCartPage(); // Empty cart
//     updateBadge();
// }


// 1. Cart se item remove karna
let removeFromCart = (id) => {
    for (let i = 0; i < cart.length; i++) {

        // Check kar rahe hain ke current item ka id us id ke barabar hai ya nahi jo function ko mila hai
        if (cart[i].id === id) {

            // Agar id match ho jaye to us item ko cart se remove kar do
            cart.splice(i, 1);

            break;
        }
    }

    saveCart();
    renderCartPage();
};


// 2. Cart page k ander quantity barhana ya kam karna
let increaseQty = (id) => {
    for (let i = 0; i < cart.length; i++) {

        // Check kar rahe hain ke current item ka id
        // us id ke barabar hai ya nahi jo function ko mila hai
        if (cart[i].id === id) {
            cart[i].qty++;
            break;
        }
    }

    saveCart();
    renderCartPage();
};

let decreaseQty = (id) => {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            // Agar quantity 1 se zyada hai tab hi quantity ko 1 se kam kardo
            if (cart[i].qty > 1) {
                cart[i].qty--;
            }
            break;
        }
    }

    saveCart();
    renderCartPage();
};

// 3. Cart ka total calculate karna
let calculateTotal = () => {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        // Har item ka total: price × quantity
        total = total + (cart[i].price * cart[i].qty);
    }
    return total;
};


// 4. Cart page ka HTML render karna
let renderCartPage = () => {
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p style="text-align:center; color:black; padding:2rem;">Your cart is empty</p><a href="index.html#product"><button>Go to Products</button></a>';
        
        return;
    }

    const total = calculateTotal();

    let rows = cart.map(item => `
        <tr>
            <td><img src="${item.image}" alt="${item.title}" style="width:50px;
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
            <td >$${(item.price * item.qty).toFixed(2)}</td>
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

// 5. LocalStorage me data save karna
let saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadge();
};

// 6. Cart badge ka number update karna
let updateBadge = () => {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {

        // Har item ki quantity total count me add kar rahe hain
        count = count + cart[i].qty;
    }
    cartBadge.innerText = count;
};


renderCartPage();
updateBadge();
