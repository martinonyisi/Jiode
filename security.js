// Basic security measures for the JIODE streaming aggregator

// Copyright protection
document.addEventListener('DOMContentLoaded', function() {
    // Prevent right-click and image saving
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('Content is protected by Martony copyright.');
    });
    
    // Prevent text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
    
    // Prevent drag and drop of images
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
});

// Anti-scraping measures
(function() {
    // Detect common scraping tools
    const isHeadless = /HeadlessChrome/.test(window.navigator.userAgent);
    const isPhantom = /PhantomJS/.test(window.navigator.userAgent);
    const isScrapingBot = /bot|spider|crawl|scraper/i.test(window.navigator.userAgent);
    
    if (isHeadless || isPhantom || isScrapingBot) {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; color: white; background-color: #e94560;">
                <h1>Access Denied</h1>
                <p>Automated scraping of JIODE content is prohibited.</p>
                <p>All rights reserved to Martony.</p>
            </div>
        `;
        throw new Error('Scraping attempt detected');
    }
    
    // Obfuscate movie data in production (this is a simple example)
    window.movieData = window.movieData || {};
    Object.defineProperty(window, 'movieData', {
        configurable: false,
        writable: false
    });
    
    // Protect against iframe embedding
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
})();

// Rate limiting simulation (in a real app, this would be server-side)
const requestLimiter = {
    requests: {},
    check: function(ip) {
        const now = Date.now();
        if (!this.requests[ip]) {
            this.requests[ip] = [now];
            return true;
        }
        
        this.requests[ip] = this.requests[ip].filter(time => now - time < 60000);
        
        if (this.requests[ip].length >= 60) {
            return false;
        }
        
        this.requests[ip].push(now);
        return true;
    }
};

// Simulate IP-based rate limiting (client-side simulation only)
document.addEventListener('click', function(e) {
    if (e.target.closest('.movie-card') || e.target.closest('#search-btn')) {
        // In a real app, this would be the user's IP
        const simulatedIp = 'user_' + Math.floor(Math.random() * 1000);
        
        if (!requestLimiter.check(simulatedIp)) {
            alert('Too many requests. Please wait a moment before trying again.');
            e.preventDefault();
        }
    }
});

// Content Security Policy would be implemented via HTTP headers in production
// This is just a client-side simulation
console.log('Content Security Policy: script-src \'self\' https://cdnjs.cloudflare.com; img-src \'self\' data: https://via.placeholder.com;');
