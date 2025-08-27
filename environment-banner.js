// Environment Banner Management
(function() {
    'use strict';
    
    function createEnvironmentBanner() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        
        let environment = null;
        let environmentText = '';
        
        // Detect environment based on hostname
        if (hostname === 'localhost' || hostname === '127.0.0.1' || protocol === 'file:') {
            environment = 'local';
            environmentText = '🧪 Environnement de Test';
        } else if (hostname.includes('vercel.app') && !hostname.includes('viconseil.vercel.app')) {
            // Dev environment on Vercel (not production domain)
            environment = 'dev';
            environmentText = '🚀 Environnement de Développement';
        }
        // No banner for production (viconseil.vercel.app or custom domain)
        
        // Create and insert banner if environment is detected
        if (environment) {
            const banner = document.createElement('div');
            banner.className = `env-banner ${environment}`;
            banner.textContent = environmentText;
            
            // Insert banner at the beginning of body
            document.body.insertBefore(banner, document.body.firstChild);
            document.body.classList.add('has-env-banner');
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createEnvironmentBanner);
    } else {
        createEnvironmentBanner();
    }
})();