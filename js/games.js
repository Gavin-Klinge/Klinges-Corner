/**
 * Games Page Functionality
 * Handles search, filtering, and interactive features for the games page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize game search and filter functionality
    initGameSearch();
    initGameFilters();
    initGameTiles();
    initSliderNavigation();
});

/**
 * Initialize game search functionality
 */
function initGameSearch() {
    const searchInput = document.getElementById('game-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const gameTiles = document.querySelectorAll('.netflix-tile');
        const gameRows = document.querySelectorAll('.netflix-row');
        
        // Filter tiles based on search term
        gameTiles.forEach(tile => {
            const title = tile.querySelector('h3').textContent.toLowerCase();
            const description = tile.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                tile.style.display = 'block';
            } else {
                tile.style.display = 'none';
            }
        });
        
        // Hide empty rows
        gameRows.forEach(row => {
            const visibleTiles = row.querySelectorAll('.netflix-tile[style="display: block"]');
            if (visibleTiles.length === 0) {
                row.style.display = 'none';
            } else {
                row.style.display = 'block';
            }
        });
    });
}

/**
 * Initialize game filter functionality
 */
function initGameFilters() {
    const filterButtons = document.querySelectorAll('.game-filter');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const gameTiles = document.querySelectorAll('.netflix-tile');
            const gameRows = document.querySelectorAll('.netflix-row');
            
            if (filter === 'all') {
                // Show all rows and tiles
                gameRows.forEach(row => row.style.display = 'block');
                gameTiles.forEach(tile => tile.style.display = 'block');
            } else {
                // Hide all rows first
                gameRows.forEach(row => row.style.display = 'none');
                
                // Show rows with matching category
                const categoryRows = document.querySelectorAll(`.netflix-row[data-category="${filter}"]`);
                categoryRows.forEach(row => row.style.display = 'block');
                
                // Show tiles with matching category
                gameTiles.forEach(tile => {
                    const categories = tile.getAttribute('data-categories');
                    if (categories && categories.includes(filter)) {
                        tile.style.display = 'block';
                    } else {
                        tile.style.display = 'none';
                    }
                });
            }
        });
    });
}

/**
 * Initialize game tiles with loading states and animations
 */
function initGameTiles() {
    const gameTiles = document.querySelectorAll('.netflix-tile');
    if (!gameTiles.length) return;
    
    // Add loading state to images
    gameTiles.forEach(tile => {
        const img = tile.querySelector('img');
        tile.classList.add('loading');
        
        img.addEventListener('load', function() {
            tile.classList.remove('loading');
        });
        
        // Add click event for play button
        const playButton = tile.querySelector('.play-now-btn');
        if (playButton) {
            playButton.addEventListener('click', function(e) {
                e.stopPropagation();
                const gameTitle = tile.querySelector('h3').textContent;
                console.log(`Playing game: ${gameTitle}`);
                // Here you would typically navigate to the game or show a modal
            });
        }
        
        // Add click event for the entire tile
        tile.addEventListener('click', function() {
            const gameTitle = tile.querySelector('h3').textContent;
            console.log(`Selected game: ${gameTitle}`);
            // Here you would typically navigate to the game details page
        });
    });
}

/**
 * Initialize slider navigation buttons
 */
function initSliderNavigation() {
    const sliders = document.querySelectorAll('.netflix-slider');
    if (!sliders.length) return;
    
    sliders.forEach(slider => {
        const row = slider.closest('.netflix-row');
        if (!row) return;
        
        // Create navigation buttons
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-nav slider-prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextButton = document.createElement('button');
        nextButton.className = 'slider-nav slider-next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        // Add buttons to the row
        row.appendChild(prevButton);
        row.appendChild(nextButton);
        
        // Add click events
        prevButton.addEventListener('click', function() {
            slider.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        nextButton.addEventListener('click', function() {
            slider.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
        
        // Show/hide navigation buttons based on scroll position
        slider.addEventListener('scroll', function() {
            const isAtStart = slider.scrollLeft <= 0;
            const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
            
            prevButton.style.opacity = isAtStart ? '0.5' : '1';
            nextButton.style.opacity = isAtEnd ? '0.5' : '1';
        });
        
        // Initial check
        slider.dispatchEvent(new Event('scroll'));
    });
}

/**
 * Handle game play functionality
 * @param {string} gameId - The ID of the game to play
 */
function playGame(gameId) {
    console.log(`Playing game with ID: ${gameId}`);
    // Here you would typically navigate to the game or show a modal
}

/**
 * Handle game details view
 * @param {string} gameId - The ID of the game to view details for
 */
function viewGameDetails(gameId) {
    console.log(`Viewing details for game with ID: ${gameId}`);
    // Here you would typically navigate to the game details page
} 