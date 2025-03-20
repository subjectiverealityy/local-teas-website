const menuItems = document.querySelector('.menu-container')
const productList = document.querySelector('.product-list')
  

let jsonFile = '../public/products.json';
    

fetch(jsonFile)
    .then(response => response.json())  
    .then(data => {
    data.map(item => {
        let {id, name, description, price, image} = item;
        menuItems.innerHTML += `
        <div class="menu-item" data-id="${id}" data-name="${name}" data-price="${price}">
            <img src="${image[0]}" alt="${name} Tea" height="100" width="100">
            <h3>${name} Tea</h3>
            <p class="small light-accent-text">${description}</p>
        </div>
        `;          
    });   
});


fetch(jsonFile)
    .then(response => response.json())  
    .then(data => {
    data.map(product => {
        let {id, name, description, price, image} = product;
        productList.innerHTML += `
        <div class="tea card light-background" data-id="${id}" data-name="${name}" data-price="${price}">
            <img src="${image[1]}" alt=${name} Tea>
            <h3 class="dark-text">${name} Tea</h3>
            <p class="small dark-text">${description}</p>
            <p class="dark-text">N${price}</p>
        </div>
        `;        
    })   
});

let cart = JSON.parse(localStorage.getItem("cart")) || []; 
updateCart();

document.addEventListener('click', (event) => {
    let productItems = event.target.closest('.tea');
    if (productItems) {
        console.log('It worked!');
    };
    if (!productItems) return;

    let productId = productItems.getAttribute('data-id');
    let productName = productItems.getAttribute('data-name');
    let productPrice = Number(productItems.getAttribute('data-price'));
    console.log(productId, productName, productPrice);

    let cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };

    let existingItem = cart.find(match => match.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    };

    updateCart();
});

function updateCart() {
    let cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = "";

    if(cart.length === 0) {
        cartContainer.innerHTML = `
        <h2 class="dark-text">Click on an Item to Add It To The Cart</h2>
        `;
    }

    if(cart.length > 0) {
        cartContainer.innerHTML += `
        <h2 class="dark-text">Your Cart</h2>
        `
    }

    let totalPrice = 0;

    cart.forEach(cartItem => {       
        totalPrice += cartItem.price * cartItem.quantity; 

        cartContainer.innerHTML += `
            <div class="cart-item" data-id="${cartItem.id}">
                <h3 class="cart-item-name dark-text">${cartItem.name} Tea</h3>
                <div class="cart-item-quantity">
                    <button class="cart-item-decrease" aria-label="Decrease Quantity">-</button>
                    <p class="cart-item-amount"><span>x${cartItem.quantity}</span></p>
                    <button class="cart-item-increase" aria-label="Increase Quantity">+</button>
                </div>
                <p class="cart-item-price">N${cartItem.price * cartItem.quantity}</p>
                <button class="cart-item-remove" aria-label="Remove From Cart">×</button>
            </div>
        `;
    });

    if (cart.length > 0) {
        cartContainer.innerHTML += `
            <div class="cart-summary">
                <p class="cart-total dark-text italicise">Total: N${totalPrice}</p>
                <button class="cart-checkout">Checkout</button>
            </div>
        `;
    }
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cart Item Buttons Functionality
document.querySelector('.cart-container').addEventListener('click', (event) => {
    let target = event.target;
    let cartItemElement = target.closest('.cart-item');
    if (!cartItemElement) return;

    let productId = cartItemElement.getAttribute('data-id');

    if (target.classList.contains("cart-item-increase")) { // 'Increase' button
        let item = cart.find(i => i.id === productId);
        if (item) item.quantity++;
    } else if (target.classList.contains("cart-item-decrease")) { // 'Decrease' button
        let item = cart.find(i => i.id === productId);
        if (item && item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(i => i.id !== productId);
        }
    } else if (target.classList.contains("cart-item-remove")) { // 'Remove' button
        cart = cart.filter(i => i.id !== productId);
    }

    saveCart();
    updateCart();
});