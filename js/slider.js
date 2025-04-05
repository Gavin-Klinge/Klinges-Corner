class ContentSlider {
    constructor(sectionId, dataKey) {
        this.section = document.querySelector(`#${sectionId}`);
        this.slider = this.section.querySelector('.content-slider');
        this.prevBtn = this.section.querySelector('.slider-arrow.prev');
        this.nextBtn = this.section.querySelector('.slider-arrow.next');
        this.data = contentData[dataKey];
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = this.calculateAutoPlayDelay();
        
        // Responsive swipe properties
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.dragThreshold = this.calculateDragThreshold();
        
        // Add resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
        
        this.init();
    }

    calculateAutoPlayDelay() {
        // Adjust auto-play delay based on screen width
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) return 4000; // Faster on mobile
        if (screenWidth > 1920) return 6000; // Slower on large screens
        return 5000; // Default
    }

    calculateDragThreshold() {
        // Adjust drag threshold based on screen width
        const screenWidth = window.innerWidth;
        return Math.max(30, Math.min(50, screenWidth * 0.05));
    }

    handleResize() {
        // Update responsive values on resize
        this.autoPlayDelay = this.calculateAutoPlayDelay();
        this.dragThreshold = this.calculateDragThreshold();
        
        // Restart auto-play with new delay
        this.pauseAutoPlay();
        this.startAutoPlay();
    }

    init() {
        // Create slider items
        this.createSliderItems();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.slide('prev'));
        this.nextBtn.addEventListener('click', () => this.slide('next'));
        
        // Add hover pause functionality
        this.slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Add keyboard navigation
        this.section.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.slide('prev');
            } else if (e.key === 'ArrowRight') {
                this.slide('next');
            }
        });
        
        // Add touch and mouse events for swipe
        this.addSwipeListeners();
        
        // Make slider focusable
        this.slider.setAttribute('tabindex', '0');
        this.slider.setAttribute('role', 'region');
        this.slider.setAttribute('aria-label', `${this.data.title} slider`);
        
        // Update section title
        this.section.querySelector('h2').textContent = this.data.title;
        
        // Start auto-play
        this.startAutoPlay();
    }

    addSwipeListeners() {
        // Touch events
        this.slider.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
            this.isDragging = true;
            this.pauseAutoPlay();
        }, { passive: true });

        this.slider.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            
            // Check if horizontal movement is greater than vertical
            const deltaX = touchX - this.touchStartX;
            const deltaY = touchY - this.touchStartY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                this.updateDragPosition(deltaX);
            }
        }, { passive: false });

        this.slider.addEventListener('touchend', () => {
            if (!this.isDragging) return;
            this.isDragging = false;
            this.handleSwipeEnd();
            this.startAutoPlay();
        });

        // Mouse events
        this.slider.addEventListener('mousedown', (e) => {
            this.startX = e.clientX;
            this.isDragging = true;
            this.pauseAutoPlay();
        });

        this.slider.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const deltaX = e.clientX - this.startX;
            this.updateDragPosition(deltaX);
        });

        this.slider.addEventListener('mouseup', () => {
            if (!this.isDragging) return;
            this.isDragging = false;
            this.handleSwipeEnd();
            this.startAutoPlay();
        });

        // Prevent default drag behavior
        this.slider.addEventListener('dragstart', (e) => e.preventDefault());
    }

    updateDragPosition(deltaX) {
        const items = this.slider.querySelectorAll('.slider-item');
        const currentItem = items[this.currentIndex];
        const offset = (deltaX / this.slider.offsetWidth) * 100;
        currentItem.style.transform = `translateX(${offset}%)`;
    }

    handleSwipeEnd() {
        const items = this.slider.querySelectorAll('.slider-item');
        const currentItem = items[this.currentIndex];
        const transform = window.getComputedStyle(currentItem).transform;
        const matrix = new DOMMatrix(transform);
        const offset = matrix.m41;
        
        // Reset transform
        currentItem.style.transform = '';
        
        // Determine swipe direction based on offset
        if (Math.abs(offset) > this.dragThreshold) {
            if (offset > 0) {
                this.slide('prev');
            } else {
                this.slide('next');
            }
        }
    }

    startAutoPlay() {
        if (!this.autoPlayInterval) {
            this.autoPlayInterval = setInterval(() => this.slide('next'), this.autoPlayDelay);
        }
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    createSliderItems() {
        this.slider.innerHTML = '';
        this.data.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'content-item';
            itemElement.setAttribute('role', 'group');
            itemElement.setAttribute('aria-label', `Slide ${index + 1} of ${this.data.items.length}`);
            
            // Use responsive image loading
            const imgSrc = this.getResponsiveImageUrl(item.image);
            
            itemElement.innerHTML = `
                <img class="content-item-image" 
                     src="${imgSrc}" 
                     alt="${item.title}"
                     loading="lazy"
                     width="100%"
                     height="auto">
                <div class="content-item-info">
                    <h3 class="content-item-title">${item.title}</h3>
                    <p class="content-item-description">${item.description}</p>
                    ${item.progress ? `
                        <div class="progress-bar">
                            <div class="progress" style="width: ${item.progress}%"></div>
                        </div>
                    ` : ''}
                    <a href="${item.link}" class="content-item-link">
                        Learn More
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            
            this.slider.appendChild(itemElement);
        });
    }

    getResponsiveImageUrl(baseUrl) {
        // Remove any existing width parameter
        const cleanUrl = baseUrl.split('?')[0];
        const screenWidth = window.innerWidth;
        
        // Define breakpoints for image sizes
        if (screenWidth < 640) return `${cleanUrl}?w=320`;
        if (screenWidth < 1024) return `${cleanUrl}?w=640`;
        if (screenWidth < 1920) return `${cleanUrl}?w=1024`;
        return `${cleanUrl}?w=1920`;
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