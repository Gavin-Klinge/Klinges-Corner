function createFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h3>Connect With Us</h3>
                <div class="social-links">
                    <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            <div class="footer-section">
                <h3>Contact</h3>
                <p>Email: contact@klingescorner.com</p>
                <p>Phone: (555) 123-4567</p>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/pages/classroom-hub">Classroom Hub</a></li>
                    <li><a href="/pages/professional-development">Professional Development</a></li>
                    <li><a href="/pages/life-skills">Life Skills</a></li>
                    <li><a href="/pages/parent-hub">Parent Hub</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Mr. Klinge's Corner. All rights reserved.</p>
        </div>
    `;
    return footer;
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Replace existing footer with new one
    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
        existingFooter.replaceWith(createFooter());
    } else {
        document.body.appendChild(createFooter());
    }
}); 