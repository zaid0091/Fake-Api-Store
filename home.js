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
            <div class="product-title">${p.title}</div>
            <div class="price">$${p.price}</div>
            <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
};

// 2. Add to Cart function
let addToCart = (id) => {
    let itemInCart = null;

    // Cart me check karo agar item pehle se hai
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            itemInCart = cart[i];
            break;
        }
    }

    if (itemInCart) {
        itemInCart.qty++; // agr item pehle se cart me hai, quantity barhao
    } else {
        // Product find karo products array me
        let product = null;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                product = products[i];
                break;
            }
        }
        // Naya item cart me add karo
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            qty: 1,
            image: product.image
        });
    }

    saveCart(); // Cart ko save karo
    console.log("Item added to cart:", cart);
    showToast('Item added to cart!'); // Toast show karo
};

// 3. LocalStorage me data save kerna or badge update kerna
let saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadge();
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
