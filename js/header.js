function createHeader(currentPage) {
    const header = document.createElement('header');
    header.innerHTML = `
        <nav class="navbar">
            <div class="logo">
                <a href="/">Mr. Klinge's Corner</a>
            </div>
            <div class="nav-links">
                <a href="/" ${currentPage === 'home' ? 'class="active"' : ''}>Home</a>
                <a href="/pages/today-world" ${currentPage === 'today-world' ? 'class="active"' : ''}>Today's World</a>
                <a href="/pages/mathematics" ${currentPage === 'mathematics' ? 'class="active"' : ''}>Mathematics</a>
                <a href="/pages/science" ${currentPage === 'science' ? 'class="active"' : ''}>Science</a>
                <a href="/pages/programming" ${currentPage === 'programming' ? 'class="active"' : ''}>Programming</a>
                <a href="/pages/gamified" ${currentPage === 'gamified' ? 'class="active"' : ''}>Gamified</a>
                <a href="/pages/3d-creativity" ${currentPage === '3d-creativity' ? 'class="active"' : ''}>3D Creativity</a>
            </div>
            <div class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </nav>
    `;
    return header;
}

// Add mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Initialize header on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get current page from URL
    const path = window.location.pathname;
    let currentPage = 'home';
    
    if (path.startsWith('/pages/')) {
        currentPage = path.split('/')[2];
    }
    
    // Replace existing header with new one
    const existingHeader = document.querySelector('header');
    if (existingHeader) {
        existingHeader.replaceWith(createHeader(currentPage));
    } else {
        document.body.insertBefore(createHeader(currentPage), document.body.firstChild);
    }
    
    // Initialize mobile menu
    initMobileMenu();
}); 