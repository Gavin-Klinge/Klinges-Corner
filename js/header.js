document.addEventListener('DOMContentLoaded', () => {
    const header = document.createElement('header');
    header.className = 'navbar';
    
    header.innerHTML = `
        <div class="logo">
            <a href="/" aria-label="Klinge's Corner Home">
                <span class="logo-text">Klinge's Corner</span>
            </a>
        </div>
        <nav class="nav-links" role="navigation" aria-label="Main navigation">
            <a href="/" class="active" aria-current="page">Home</a>
            <a href="/pages/classroom-hub.html">Classroom Hub</a>
            <a href="/pages/professional-development.html">Professional Development</a>
            <a href="/pages/life-skills.html">Life Skills</a>
            <a href="/pages/parent-hub.html">Parent Hub</a>
        </nav>
        <div class="auth-buttons">
            <button class="login-btn" aria-label="Sign in to your account">
                <span>Sign In</span>
            </button>
        </div>
        <button class="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded="false">
            <i class="fas fa-bars" aria-hidden="true"></i>
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

    // Handle mobile menu with improved accessibility
    const mobileMenuBtn = header.querySelector('.mobile-menu-btn');
    const navLinks = header.querySelector('.nav-links');
    
    const toggleMobileMenu = () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Trap focus within mobile menu when open
        if (!isExpanded) {
            const focusableElements = navLinks.querySelectorAll('a, button');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            navLinks.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            e.preventDefault();
                            lastFocusable.focus();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            e.preventDefault();
                            firstFocusable.focus();
                        }
                    }
                }
                if (e.key === 'Escape') {
                    toggleMobileMenu();
                }
            });
        }
    };
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Handle active link with improved accuracy
    const currentPath = window.location.pathname;
    const links = navLinks.querySelectorAll('a');
    
    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || 
            (linkPath !== '/' && currentPath.startsWith(linkPath.replace('.html', '')))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 