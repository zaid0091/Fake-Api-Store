let productsContainer = document.querySelector('#products'); // Products grid container
let cartBadge = document.getElementById('cart-count');        // Navbar cart counter
let cart = JSON.parse(localStorage.getItem('cart')) || [];    // LocalStorage me dekho cart ka data, agar nahi hai to empty array

// Fetch products from Fake Store API
let products = [];
let url = 'https://fakestoreapi.com/products';

fetch(url)
    .then(res => res.json())
    .then(data => {
        products = data;
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts(); // Data fetch hony k bad display function call
        updateBadge();    // Initial badge count set kerna
    });


// 1. Products ko main screen per render kerna
let renderProducts = () => {
    productsContainer.innerHTML = products.map((p) => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.title}">
            <div style="color:black;" class="product-title">${p.title}</div>
            <div class="price">$${p.price}</div>
            <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
};

// 2. Add to Cart function
let addToCart = (id) => {

    // Ye variable check karega ke item cart me pehle se mojood hai ya nahi
    let itemInCart = null;

    // Cart ke andar loop chala kar check kar rahe hain
    // ke given id ka item pehle se cart me hai ya nahi
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            itemInCart = cart[i]; // item mil gaya
            break; // loop stop
        }
    }

    // Agar item cart me already hai
    if (itemInCart) {

        // Sirf quantity 1 se increase kar do
        itemInCart.qty++;

    } else {

        // Agar item cart me nahi hai
        // to products array me se product dhoond rahe hain
        let product = null;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                product = products[i]; // product mil gaya
                break; // loop stop
            }
        }

        // Naya product cart me add kar rahe hain
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            qty: 1,
            image: product.image
        });
    }

    // Updated cart ko localStorage me save kar rahe hain
    saveCart();

    // Console me cart show kar rahe hain (debugging ke liye)
    console.log("Item added to cart:", cart);

    // User ko message dikhane ke liye toast show
    showToast('Item added to cart!');
};


// 3. LocalStorage me data save kerna or badge update kerna
let saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadge();
};

// 4. Cart badge ka number update kerna
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
