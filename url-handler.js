// Function to update URL without page reload
function updateURL(newPath) {
    window.history.replaceState({}, '', newPath);
}

// Function to handle URL rewriting
function handleURL() {
    const path = window.location.pathname;
    const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
    
    // If URL has .html extension, remove it
    if (cleanPath.endsWith('.html')) {
        const cleanUrl = cleanPath.replace('.html', '');
        updateURL(cleanUrl);
    }
}

// Run URL handling when page loads
document.addEventListener('DOMContentLoaded', handleURL);

// Run URL handling when navigating back/forward
window.addEventListener('popstate', handleURL); 