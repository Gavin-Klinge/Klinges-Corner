class ContentSlider {
    constructor(sectionId, dataKey) {
        this.section = document.querySelector(`#${sectionId}`);
        this.slider = this.section.querySelector('.content-slider');
        this.prevBtn = this.section.querySelector('.slider-arrow.prev');
        this.nextBtn = this.section.querySelector('.slider-arrow.next');
        this.data = contentData[dataKey];
        this.currentIndex = 0;
        
        this.init();
    }

    init() {
        // Create slider items
        this.createSliderItems();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.slide('prev'));
        this.nextBtn.addEventListener('click', () => this.slide('next'));
        
        // Update section title
        this.section.querySelector('h2').textContent = this.data.title;
    }

    createSliderItems() {
        this.slider.innerHTML = this.data.items.map((item, index) => `
            <div class="slider-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="slider-content">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="slider-text">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="${item.link}" class="slider-link">Learn More</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    slide(direction) {
        const items = this.slider.querySelectorAll('.slider-item');
        const totalItems = items.length;
        
        // Remove active class from current item
        items[this.currentIndex].classList.remove('active');
        
        // Update current index
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % totalItems;
        } else {
            this.currentIndex = (this.currentIndex - 1 + totalItems) % totalItems;
        }
        
        // Add active class to new current item
        items[this.currentIndex].classList.add('active');
    }
}

// Initialize all sliders when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const sliders = [
        { id: 'today-world', dataKey: 'today-world' },
        { id: 'mathematics', dataKey: 'mathematics' },
        { id: 'science', dataKey: 'science' },
        { id: 'programming', dataKey: 'programming' },
        { id: 'gamified', dataKey: 'gamified' },
        { id: '3d-creativity', dataKey: '3d-creativity' }
    ];

    sliders.forEach(slider => {
        new ContentSlider(slider.id, slider.dataKey);
    });
}); 