const menuButton = document.querySelector('.menu-button')
menuButton.addEventListener('click', function () {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu.style.display === 'none') {
        mobileMenu.style.display = 'block';
    } else mobileMenu.style.display = 'none';
});
