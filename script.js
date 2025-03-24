// Content data with sample courses
const contentData = {
    'continue-learning': [
        {
            id: 1,
            title: 'Calculus Basics',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500',
            progress: 65,
            description: 'Master the fundamentals of calculus with our comprehensive course.'
        },
        {
            id: 2,
            title: 'Physics Fundamentals',
            image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500',
            progress: 30,
            description: 'Explore the basic principles of physics and mechanics.'
        },
        {
            id: 3,
            title: 'Chemistry Lab',
            image: 'https://images.unsplash.com/photo-1603126957883-239d6bf0d3c7?w=500',
            progress: 45,
            description: 'Hands-on experiments and chemical reactions explained.'
        }
    ],
    'mathematics': [
        {
            id: 4,
            title: 'Linear Algebra',
            image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500',
            description: 'Understand matrices, vectors, and linear transformations.'
        },
        {
            id: 5,
            title: 'Geometry Mastery',
            image: 'https://images.unsplash.com/photo-1582289545106-efecf907f21e?w=500',
            description: 'From basic shapes to complex geometric proofs.'
        },
        {
            id: 6,
            title: 'Statistics & Probability',
            image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?w=500',
            description: 'Data analysis and probability concepts explained.'
        },
        {
            id: 7,
            title: 'Trigonometry',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500',
            description: 'Master sine, cosine, and trigonometric functions.'
        }
    ],
    'science': [
        {
            id: 8,
            title: 'Biology Essentials',
            image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500',
            description: 'Explore the fundamentals of life sciences.'
        },
        {
            id: 9,
            title: 'Chemistry 101',
            image: 'https://images.unsplash.com/photo-1603126957883-239d6bf0d3c7?w=500',
            description: 'Introduction to atomic structure and chemical bonds.'
        },
        {
            id: 10,
            title: 'Physics in Action',
            image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500',
            description: 'Real-world applications of physics principles.'
        },
        {
            id: 11,
            title: 'Environmental Science',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500',
            description: 'Understanding our planet and ecosystems.'
        }
    ],
    'programming': [
        {
            id: 12,
            title: 'Python for Beginners',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500',
            description: 'Start your programming journey with Python.'
        },
        {
            id: 13,
            title: 'Web Development',
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500',
            description: 'Build modern websites with HTML, CSS, and JavaScript.'
        },
        {
            id: 14,
            title: 'Data Structures',
            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500',
            description: 'Essential computer science concepts explained.'
        },
        {
            id: 15,
            title: 'Machine Learning',
            image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500',
            description: 'Introduction to AI and machine learning algorithms.'
        }
    ]
};

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Show a simple thank you message
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Grid item hover effect
document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', function() {
        const subject = this.querySelector('h3').textContent;
        // Here you would typically navigate to the subject page
        console.log(`Navigating to ${subject}`);
    });
});

// Login/Signup button handlers
document.querySelector('.login-btn').addEventListener('click', function() {
    // Here you would typically show a login modal
    console.log('Login clicked');
});

document.querySelector('.signup-btn').addEventListener('click', function() {
    // Here you would typically show a signup modal
    console.log('Signup clicked');
});

// CTA button handler
document.querySelector('.cta-button').addEventListener('click', function() {
    // Scroll to subjects section
    document.querySelector('#subjects').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Authentication functionality
const authModal = document.getElementById('authModal');
const loginBtn = document.querySelector('.login-btn');
const closeBtn = document.querySelector('.modal .close');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

// Show/hide modal
loginBtn.addEventListener('click', () => {
    authModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    authModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

// Tab switching
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetForm = tab.dataset.tab;
        
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${targetForm}Form`).classList.add('active');
    });
});

// Form submission
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    try {
        // Add your authentication logic here
        console.log('Login:', { email, password });
        authModal.style.display = 'none';
        loginForm.reset();
    } catch (error) {
        console.error('Login error:', error);
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    try {
        // Add your registration logic here
        console.log('Signup:', { name, email, password });
        authModal.style.display = 'none';
        signupForm.reset();
    } catch (error) {
        console.error('Signup error:', error);
    }
});

// Content slider functionality
function initializeSliders() {
    const sliders = document.querySelectorAll('.content-row');
    
    sliders.forEach(slider => {
        const contentSlider = slider.querySelector('.content-slider');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                contentSlider.scrollBy({
                    left: -contentSlider.offsetWidth,
                    behavior: 'smooth'
                });
            });
            
            nextBtn.addEventListener('click', () => {
                contentSlider.scrollBy({
                    left: contentSlider.offsetWidth,
                    behavior: 'smooth'
                });
            });
        }
    });
}

// Load content items
function loadContentItems() {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        const title = section.querySelector('h2').textContent.toLowerCase();
        const slider = section.querySelector('.content-slider');
        const items = contentData[title.replace(/\s+/g, '-')] || [];
        
        items.forEach(item => {
            const contentItem = document.createElement('div');
            contentItem.className = 'content-item';
            contentItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="content-item-info">
                    <h3 class="content-item-title">${item.title}</h3>
                    ${item.progress ? `
                        <div class="progress-bar">
                            <div class="progress" style="width: ${item.progress}%"></div>
                        </div>
                    ` : ''}
                </div>
            `;
            
            contentItem.addEventListener('click', () => {
                window.location.href = `/pages/content.html?id=${item.id}`;
            });
            
            slider.appendChild(contentItem);
        });
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSliders();
    loadContentItems();
}); 