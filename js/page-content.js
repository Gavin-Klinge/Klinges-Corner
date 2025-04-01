// Function to load page content
function loadPageContent() {
    // Get current page from URL
    const path = window.location.pathname;
    let currentPage = 'home';
    
    if (path.startsWith('/pages/')) {
        currentPage = path.split('/')[2];
    }
    
    // Get page data from contentData
    const pageData = contentData[currentPage];
    if (!pageData) return;
    
    // Set page title and description
    document.title = `${pageData.title} - Mr. Klinge's Corner`;
    
    // Update header background
    const header = document.querySelector('.page-header');
    if (header && pageData.headerBg) {
        header.style.setProperty('--header-bg', `url(${pageData.headerBg})`);
    }
    
    // Update page title and description
    const titleElement = document.querySelector('.page-title');
    const descriptionElement = document.querySelector('.page-description');
    
    if (titleElement) {
        titleElement.textContent = pageData.title;
    }
    
    if (descriptionElement && pageData.description) {
        descriptionElement.textContent = pageData.description;
    }
    
    // Load content cards
    const contentGrid = document.querySelector('.content-grid');
    if (contentGrid && pageData.items) {
        contentGrid.innerHTML = pageData.items.map(item => `
            <div class="content-card">
                <img src="${item.image}" alt="${item.title}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-description">${item.description}</p>
                    <a href="${item.link}" class="card-link">Learn More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
    }
}

// Initialize page content when DOM is loaded
document.addEventListener('DOMContentLoaded', loadPageContent); 