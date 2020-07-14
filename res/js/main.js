
$(function () {

    // 移动端弹出navmenu
    var navbar = $('#navbar'),
        navbarBurgers = navbar.find('.navbar-burger');

    navbarBurgers.click(function (e) { 
        navbarBurgers.toggleClass('is-active');
        document.getElementById(navbarBurgers.data('target')).classList.toggle('is-active');
    });

    // 滚动时自动隐藏/显示导航栏
    var lastY = window.scrollY;
    $(window).scroll(function(){
        var currentY = window.scrollY;

        if (currentY > lastY) {
            if (navbar.is(":visible") && currentY - lastY > 20) {
                navbar.hide()
            };
        } else {
            if (!navbar.is(":visible")) {
                navbar.show()
            };
        }
        lastY = currentY;
    });
    

});