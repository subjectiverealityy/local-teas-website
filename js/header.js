function dynamicHeader() {
    if (window.location.href.includes("/pages/")) {
    fetch('../components/header.html')
    .then(response => response.text())
    .then(data => document.querySelector('.header').innerHTML = data);
    }
    mobileMenu();
}

dynamicHeader();

function mobileMenu() {
    setTimeout(() => {
        let menuButton = document.querySelector('.menu-button');
        menuButton.addEventListener('click', function () {
        let mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu.style.display === 'none') {
            mobileMenu.style.display = 'block';
        } else mobileMenu.style.display = 'none';
        });
    }, 500);
}








