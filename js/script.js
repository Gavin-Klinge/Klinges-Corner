// Load featured hero section
function loadFeaturedHero() {
    const featuredHero = document.querySelector('.featured-hero');
    const featuredContent = featuredHero.querySelector('.featured-content');
    const { title, description, buttons } = headerData.featured;

    // Set background image
    featuredHero.style.backgroundImage = `linear-gradient(to top, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0.4) 60%, rgba(20, 20, 20, 0.4) 100%), url('${headerData.featured.backgroundImage}')`;

    // Update content
    featuredContent.innerHTML = `
        <h1 class="featured-title">${title}</h1>
        <p class="featured-description">${description}</p>
        <div class="featured-buttons">
            ${buttons.map(button => `
                <button class="${button.class}" onclick="window.location.href='${button.link}'">
                    <i class="${button.icon}"></i> ${button.text}
                </button>
            `).join('')}
        </div>
    `;
}

// Load content sections
function loadContentSections() {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionData = headerData.sections.find(s => s.id === sectionId);
        
        if (sectionData) {
            // Update section title and description
            const titleElement = section.querySelector('h2');
            titleElement.textContent = sectionData.title;
            
            // Create description element if it doesn't exist
            let descriptionElement = section.querySelector('.section-description');
            if (!descriptionElement) {
                descriptionElement = document.createElement('p');
                descriptionElement.className = 'section-description';
                titleElement.after(descriptionElement);
            }
            descriptionElement.textContent = sectionData.description;
            
            // Load content items
            const slider = section.querySelector('.content-slider');
            slider.innerHTML = sectionData.items.map(item => `
                <div class="content-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="content-item-info">
                        <h3 class="content-item-title">${item.title}</h3>
                        <p class="content-item-description">${item.description}</p>
                        ${item.badge ? `<span class="content-item-badge ${item.badge.toLowerCase()}">${item.badge}</span>` : ''}
                    </div>
                </div>
            `).join('');
            
            // Add click events to content items
            slider.querySelectorAll('.content-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    window.location.href = sectionData.items[index].link;
                });
            });
        }
    });
}

// Initialize sliders
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

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedHero();
    loadContentSections();
    initializeSliders();
}); 