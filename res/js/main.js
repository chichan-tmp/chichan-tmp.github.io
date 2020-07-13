$(function () {
    var navbar = $('#navbar'),
        navbarBurgers = navbar.find('.navbar-burger');
    
    navbarBurgers.click(function (e) { 
        e.target.classList.toggle('is-active');
        document.getElementById(e.target.dataset.target).classList.toggle('is-active');
    });
});