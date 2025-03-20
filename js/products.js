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
                    <button class="cart-item-decrease" aria-label="Decrease Quantity">−</button>
                    <span class="cart-item-amount">x${cartItem.quantity}</span>
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


  





/*   

cartItem = document.querySelector('.cart-item');
cartItem.querySelector('.cart-item-increase').addEventListener('click', () => {
    let item = cart.find(item => item.id === productId);
    if (item) console.log('clicked');
});


document.querySelector('.cart-container').addEventListener('click', (event) => {
    let productId = target.getAttribute('data-id');

    if (event.target.classList.contains('.cart-item-increase')) {
        let cartItem = cart.find(cartItem => cartItem.id === productId);
        if (cartItem) item.quantity++;
    }
})

 let cartId = cartItems.getAttribute('data-id');

    fetch(jsonFile)
    .then(response => response.json())  
    .then(data => {
        let selectedData = data[2];        
        const cartItems = document.querySelector('.cart-item');

        cartItems.innerHTML = `
        <div class="menu-item" data-product-id="${selectedData.id}">
            <img src="${selectedData.image[0]}" alt="${selectedData.name} Tea" height="100" width="100">
            <h3>${selectedData.name} Tea</h3>
            <p class="small light-accent-text">${selectedData.description}</p>
        </div>
        `;            
});


    // if (productId = cartId) {}
        
    

});




/*

cartContainer.innerHTML += `
        <h3 class="cart-item-name dark-text" data-product-id="${id}">${name}</h3>
                        <div class="cart-item-quantity">
                            <button class="cart-item-decrease" aria-label="Decrease Quantity">−</button>
                            <span class="cart-item-amount">x1</span>
                            <button class="cart-item-increase" aria-label="Decrease Quantity">+</button>
                        </div>
                        <p class="cart-item-price">N${price}</p>
                        <button class="cart-item-remove" aria-label="Remove From Cart">×</button>
        `
    


let toMatch = productItems.id

setTimeout(() => { // since the elements are dynamically loaded, this ensures the script runs after they appear
    let productCard = document.querySelectorAll('.tea.card');    
productCard.forEach(card => {
    card.addEventListener('click', () => {

        let cartItemId = cartItem.getAttribute('data-product-id');
        let productCardId = productList.getAttribute('data-product-id').textContent;
        cartItemId.number = productCardId;

        if (cartItemId === productCardId); {

        let cartItemHeading = cartItem.querySelector('.cart-item-name');
        let productCardHeading = productList.querySelector('.tea h3').textContent;
        cartItemHeading.textContent = productCardHeading;

        let cartItemPrice = cartItem.querySelector('.cart-item-price');
        let productCardPrice = productList.querySelector('.tea p')[1].textContent;
        cartItemPrice.textContent = productCardPrice;

        } 

        

        
        
        
        fetch(jsonFile)
        .then(response => response.json())  
        .then(data => {
        data.map(product => {
            let {id, name, description, price, image} = product;
            cartItem.innerHTML = `
                        <h3 class="cart-item-name dark-text" data-product-id="${id}">${name}</h3>
                        <div class="cart-item-quantity">
                            <button class="cart-item-decrease" aria-label="Decrease Quantity">−</button>
                            <span class="cart-item-amount">x1</span>
                            <button class="cart-item-increase" aria-label="Decrease Quantity">+</button>
                        </div>
                        <p class="cart-item-price">N${price}</p>
                        <button class="cart-item-remove" aria-label="Remove From Cart">×</button>
        `;
    })
});
        cartContainer.appendChild(cartItem); 
    });
});

}, 500);




/* 

            if (productList.document.querySelector('.data-product-id')) ===
            (cardItem.document.querySelector('.data-product-id')); {
                console.log('YES');
            } else {
                console.log('NO');
            }

        let cartItemHeading = cartItem.querySelector('.cart-item-name');
        let productCardHeading = productList.querySelector('.tea h3').textContent;
        cartItemHeading.textContent = productCardHeading;

        let cartItemPrice = cartItem.querySelector('.cart-item-price');
        let productCardPrice = productList.querySelector('.tea p.price').textContent;
        cartItemPrice.textContent = productCardPrice;






data.map(item => {
    const {id, name, description, price, image} = item;
    productList.innerHTML += `
    <div class="tea card light-background data-product-id="${id}"">
        <img src="${image}" alt=${name} Tea>
        <h3>${name} Tea</h3>
        <p class="small">${description}</p>
        <p>N${price}</p>
    </div>
    `;     
})

fetch(jsonFile)
    .then(response => response.json())  
    .then(data => {

    data.map(item => {
        const {id, name, description, price, image} = item;
        productList.innerHTML += `
        <div class="tea card light-background data-product-id="${id}"">
            <img src="${image}" alt=${name} Tea>
            <h3>${name} Tea</h3>
            <p class="small">${description}</p>
            <p>N${price}</p>
        </div>
        `;     
    })
}); */

/* Two products.json elements were removed.
{
    "id": 4,
    "name": "Lemongrass",
    "description": "With its refreshing citrus aroma, lemongrass tea supports digestion, reduces stress, and may help lower blood pressure.",
    "price": 3200,
    "image": "images/test.jpg"
},
{
    "id": 8,
    "name": "Bitterleaf",
    "description": "Bitter but beneficial, this tea helps detoxify the body, supports liver health, and improves digestion.",
    "price": 3200,
    "image": "images/test.jpg"
}
*/