function createHeader(currentPage) {
    const header = document.createElement('header');
    header.innerHTML = `
        <nav class="navbar">
            <div class="logo">
                <a href="/">Mr. Klinge's Corner</a>
            </div>
            <div class="nav-links">
                <a href="/pages/classroom-hub" ${currentPage === 'classroom-hub' ? 'class="active"' : ''}>Classroom Hub</a>
                <a href="/pages/professional-development" ${currentPage === 'professional-development' ? 'class="active"' : ''}>Professional Development</a>
                <a href="/pages/life-skills" ${currentPage === 'life-skills' ? 'class="active"' : ''}>Life Skills</a>
                <a href="/pages/parent-hub" ${currentPage === 'parent-hub' ? 'class="active"' : ''}>Parent Hub</a>
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

// Handle scroll events
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
}); 