document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    mobileMenuToggle.addEventListener('click', function() {
        document.body.classList.add('mobile-menu-open');
    });
    
    mobileMenuClose.addEventListener('click', function() {
        document.body.classList.remove('mobile-menu-open');
    });
    
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            document.body.classList.remove('mobile-menu-open');
        }
    });
});