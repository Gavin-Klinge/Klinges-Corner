// Content data for educational courses
const contentData = {
    "continue-learning": [
        {
            id: "math-101",
            title: "Mathematics Fundamentals",
            image: "images/content/math.jpg",
            progress: 75,
            description: "Master the basics of mathematics with interactive lessons and exercises."
        },
        {
            id: "science-101",
            title: "Introduction to Science",
            image: "images/content/science.jpg",
            progress: 60,
            description: "Explore the wonders of science through engaging experiments and demonstrations."
        },
        {
            id: "programming-101",
            title: "Coding Basics",
            image: "images/content/programming.jpg",
            progress: 45,
            description: "Learn the fundamentals of programming with hands-on coding exercises."
        }
    ],
    "mathematics": [
        {
            id: "algebra-101",
            title: "Algebra Fundamentals",
            image: "images/content/algebra.jpg",
            progress: 0,
            description: "Master algebraic concepts with step-by-step tutorials and practice problems."
        },
        {
            id: "geometry-101",
            title: "Geometry Basics",
            image: "images/content/geometry.jpg",
            progress: 0,
            description: "Explore geometric shapes and concepts through interactive lessons."
        }
    ],
    "science": [
        {
            id: "physics-101",
            title: "Physics Principles",
            image: "images/content/physics.jpg",
            progress: 0,
            description: "Understand the fundamental principles of physics with practical examples."
        },
        {
            id: "chemistry-101",
            title: "Chemistry Basics",
            image: "images/content/chemistry.jpg",
            progress: 0,
            description: "Learn about chemical reactions and elements through virtual experiments."
        }
    ],
    "programming": [
        {
            id: "python-101",
            title: "Python Programming",
            image: "images/content/python.jpg",
            progress: 0,
            description: "Start your programming journey with Python, a versatile and beginner-friendly language."
        },
        {
            id: "web-dev-101",
            title: "Web Development",
            image: "images/content/webdev.jpg",
            progress: 0,
            description: "Learn HTML, CSS, and JavaScript to create interactive websites."
        }
    ]
};

// DOM Elements
const newsletterForm = document.getElementById('newsletter-form');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollLinks = document.querySelectorAll('a[href^="#"]');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initNewsletterForm();
    initMobileMenu();
    initSmoothScroll();
    initAuthentication();
    initContentCards();
    initAnimations();
    initThemeToggle();
});

// Newsletter subscription
function initNewsletterForm() {
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for subscribing!';
                newsletterForm.appendChild(successMessage);
                
                // Reset form
                newsletterForm.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } catch (error) {
                console.error('Newsletter subscription error:', error);
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', 
                mobileMenu.classList.contains('active'));
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Authentication functionality
function initAuthentication() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (loginBtn && signupBtn && authModal && closeModalBtn) {
        // Open modal
        loginBtn.addEventListener('click', () => openAuthModal('login'));
        signupBtn.addEventListener('click', () => openAuthModal('signup'));
        
        // Close modal
        closeModalBtn.addEventListener('click', closeAuthModal);
        
        // Close modal when clicking outside
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                closeAuthModal();
            }
        });
        
        // Handle form submission
        const authForm = authModal.querySelector('form');
        if (authForm) {
            authForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(authForm);
                const data = Object.fromEntries(formData);
                
                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Authentication successful!';
                    authForm.appendChild(successMessage);
                    
                    // Reset form and close modal
                    authForm.reset();
                    setTimeout(() => {
                        closeAuthModal();
                        successMessage.remove();
                    }, 2000);
                } catch (error) {
                    console.error('Authentication error:', error);
                }
            });
        }
    }
}

// Content cards functionality
function initContentCards() {
    const cards = document.querySelectorAll('.content-card');
    
    cards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-sm)';
        });
        
        // Add click event
        card.addEventListener('click', () => {
            const cardId = card.dataset.id;
            if (cardId) {
                viewContentDetails(cardId);
            }
        });
    });
}

// Animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.body.setAttribute('data-theme', 
                e.matches ? 'dark' : 'light');
        }
    });
}

// Helper functions
function openAuthModal(type) {
    const authModal = document.getElementById('auth-modal');
    const modalTitle = authModal.querySelector('.modal-title');
    const submitBtn = authModal.querySelector('button[type="submit"]');
    
    modalTitle.textContent = type === 'login' ? 'Login' : 'Sign Up';
    submitBtn.textContent = type === 'login' ? 'Login' : 'Sign Up';
    
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    const authModal = document.getElementById('auth-modal');
    authModal.classList.remove('active');
    document.body.style.overflow = '';
}

function viewContentDetails(contentId) {
    // Implement content details view
    console.log('Viewing content:', contentId);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNewsletterForm,
        initMobileMenu,
        initSmoothScroll,
        initAuthentication,
        initContentCards,
        initAnimations,
        initThemeToggle
    };
} 