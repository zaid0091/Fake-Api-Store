let productsContainer = document.querySelector('#products');
let cartBadge = document.getElementById('cart-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];    // LocalStorage me dekho cart ka data, agar nahi hai to empty array

let products = [];
let url = 'https://fakestoreapi.com/products';

fetch(url)
    .then(res => res.json())
    .then(data => {
        products = data;
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
        updateBadge();
    });


// 1. Products ko render karna
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
            break;
        }
    }

    // Agar item cart me already hai
    if (itemInCart) {
        itemInCart.qty++;

    } else {

        // Agar item cart me nahi hai
        // to products array me se product dhoond rahe hain
        let product = null;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                product = products[i];
                break;
            }
        }

        // Naya product cart me add kar rahe hain
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            qty: 1,
            image: product.image,
            description: product.description
        });
        console.log("Item added to cart:", product.title);
    }

    saveCart();

};


// 3. LocalStorage me data save karna or badge update karna
let saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadge();
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


