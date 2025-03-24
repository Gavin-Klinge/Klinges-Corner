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
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const closeBtns = document.querySelectorAll('.auth-modal .close');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Show/hide modals
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners for modal controls
loginBtn.addEventListener('click', () => showModal(loginModal));
signupBtn.addEventListener('click', () => showModal(signupModal));

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        hideModal(loginModal);
        hideModal(signupModal);
        clearForms();
    });
});

showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideModal(loginModal);
    showModal(signupModal);
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideModal(signupModal);
    showModal(loginModal);
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) hideModal(loginModal);
    if (e.target === signupModal) hideModal(signupModal);
});

// Form handling
function clearForms() {
    loginForm.reset();
    signupForm.reset();
    clearMessages();
}

function clearMessages() {
    document.querySelectorAll('.error-message, .success-message').forEach(msg => {
        msg.classList.remove('show');
    });
}

function showMessage(element, message, isError = false) {
    const messageElement = document.createElement('div');
    messageElement.className = isError ? 'error-message' : 'success-message';
    messageElement.textContent = message;
    element.appendChild(messageElement);
    messageElement.classList.add('show');
    setTimeout(() => messageElement.remove(), 3000);
}

// Login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    try {
        // Here you would typically make an API call to your backend
        // For demo purposes, we'll simulate a successful login
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store user session
        localStorage.setItem('user', JSON.stringify({
            email,
            name: 'Demo User',
            rememberMe
        }));

        showMessage(loginForm, 'Login successful!', false);
        setTimeout(() => {
            hideModal(loginModal);
            updateAuthUI();
        }, 1500);
    } catch (error) {
        showMessage(loginForm, 'Invalid email or password', true);
    }
});

// Signup form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showMessage(signupForm, 'Passwords do not match', true);
        return;
    }

    try {
        // Here you would typically make an API call to your backend
        // For demo purposes, we'll simulate a successful signup
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store user session
        localStorage.setItem('user', JSON.stringify({
            email,
            name,
            rememberMe: false
        }));

        showMessage(signupForm, 'Account created successfully!', false);
        setTimeout(() => {
            hideModal(signupModal);
            updateAuthUI();
        }, 1500);
    } catch (error) {
        showMessage(signupForm, 'Error creating account', true);
    }
});

// Update UI based on authentication state
function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        // You could add a user menu or profile button here
    } else {
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
    }
}

// Check authentication state on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
}); 