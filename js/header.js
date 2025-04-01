document.addEventListener('DOMContentLoaded', () => {
    const header = document.createElement('header');
    header.className = 'navbar';
    
    header.innerHTML = `
        <a href="/" class="logo">
            <i class="fas fa-graduation-cap"></i>
            Klinge's Corner
        </a>
        <div class="nav-links">
            <a href="/" class="active">Home</a>
            <a href="/pages/mathematics.html">Mathematics</a>
            <a href="/pages/science.html">Science</a>
            <a href="/pages/programming.html">Programming</a>
            <a href="/pages/parent-hub.html">Parent Hub</a>
            <a href="/pages/classroom-hub.html">Classroom Hub</a>
        </div>
        <div class="auth-buttons">
            <button class="login-btn">Sign In</button>
        </div>
        <button class="mobile-menu-btn">
            <i class="fas fa-bars"></i>
        </button>
    `;

    document.body.insertBefore(header, document.body.firstChild);

    // Handle scroll effect with debounce
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    });

    // Handle mobile menu
    const mobileMenuBtn = header.querySelector('.mobile-menu-btn');
    const navLinks = header.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Set active link based on current page
    const currentPath = window.location.pathname;
    const navLinksList = header.querySelectorAll('.nav-links a');
    
    navLinksList.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}); 