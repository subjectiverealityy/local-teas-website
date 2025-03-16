const menuItems = document.querySelector('.menu-container')
const jsonFile = '../public/products.json';

fetch(jsonFile).then(response => {
    return response.json();
}).then(data => {
    data.map(item => {
        const {id, name, description, price, image} = item;
        menuItems.innerHTML += `
        <div class="menu-item" data-product-id="${id}">
            <img src="${image}" alt="${name} Tea" height="100" width="100">
            <h3>${name} Tea</h3>
            <p class="small light-accent-text">${description}</p>
        </div>
        `
    })
})


/* async function populateMenu() {
    try {
        let response = await fetch('../public/products.json');
        let data = await response.json();
        console.log(data);
        return;
    }

    console.log(data);

    const data = JSON.parse(requestAnimationFrame.name)
    
}


// async function loadMenu() {
   // const response = await
    //const menu = await response.json('../')
    //         const products = await response.json();
    // menuContainer.innerHTML = products.map(product => 
    /* fetch ("../public/products.json")
    .then(response => response.json()) // Converts response to JSON JavaScript object
    .then(data => {       
        const menuContainer = document.querySelector('.menu-container');
        let menuContent = ''; // Initialise empty HTML string
        data.items.forEach(item => {
            contentHTML += `
            <div class="item">

            <h2>${name}</h2>
            <p>${description}</p>

            </div>


            `;
        });

        menuContainer.innerHTML = menuContent.innerHTML
        

    
/*    )

    let menuContent = ''; // Initialise empty HTML string
    data.menuContainer.forEach()

        data.m
    })
   
} */