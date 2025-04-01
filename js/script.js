function loadContentItems() {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        const title = section.querySelector('h2').textContent.toLowerCase().replace(/\s+/g, '-');
        const slider = section.querySelector('.content-slider');
        const items = contentData[title] || [];
        
        items.forEach(item => {
            const contentItem = document.createElement('div');
            contentItem.className = 'content-item';
            contentItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="content-item-info">
                    <h3 class="content-item-title">${item.title}</h3>
                    <p class="content-item-description">${item.description}</p>
                    ${item.badge ? `<span class="content-item-badge ${item.badge.toLowerCase()}">${item.badge}</span>` : ''}
                </div>
            `;
            
            contentItem.addEventListener('click', () => {
                window.location.href = item.link;
            });
            
            slider.appendChild(contentItem);
        });
    });
} 