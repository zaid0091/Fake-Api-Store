let ordersDiv = document.getElementById('orders');
let orders = JSON.parse(localStorage.getItem('orders')) || [];

if (orders.length === 0) { 
    ordersDiv.innerHTML = "<p>No orders found</p>"

}else {
    ordersDiv.innerHTML = orders.map((order, index) => `
        <div style="margin-left: 20px; margin-right:20px;" class="order">
            <h3 style="color: black;">Order: ${index + 1}</h3>
            ${order.map(item => `
                <div style="border: 1px solid #ccc; padding:10px; margin:10px 0; border-radius:6px; display:flex; gap:20px; align-items:center;">
                    <img src="${item.image}" alt="${item.title}" style="width:80px; height:80px; object-fit:contain">
                    <p style="font-weight:semi-bold; color:#333;">${item.description}</p>
                    <p style="font-weight: bold; color: #333;">${item.title}</p>
                    <p style="color: #666;">Quantity: ${item.qty}</p>
                    <p style="color: #000;">Price: $${item.price}</p>
                </div>
            `).join('')}
        </div>
    `).join('');
}