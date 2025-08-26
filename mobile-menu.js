// Script pour le menu mobile - VI Conseil

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        // Toggle du menu mobile
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Changer l'icône du bouton
            if (navLinks.classList.contains('active')) {
                mobileMenu.innerHTML = '✕';
            } else {
                mobileMenu.innerHTML = '☰';
            }
        });
        
        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenu.innerHTML = '☰';
            });
        });
        
        // Fermer le menu quand on clique ailleurs
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenu.innerHTML = '☰';
            }
        });
        
        // Fermer le menu lors du redimensionnement de la fenêtre
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenu.innerHTML = '☰';
            }
        });
    }
});