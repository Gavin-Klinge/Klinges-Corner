const fs = require('fs');
const { createCanvas } = require('canvas');

// Header image dimensions
const headerWidth = 1920;
const headerHeight = 1080;

// Content image dimensions
const contentWidth = 800;
const contentHeight = 600;

// Colors for different sections
const colors = {
    'classroom-hub': '#4CAF50',
    'professional-development': '#2196F3',
    'life-skills': '#FF9800',
    'parent-hub': '#9C27B0'
};

// Generate header images
function generateHeaderImage(filename, color) {
    const canvas = createCanvas(headerWidth, headerHeight);
    const ctx = canvas.getContext('2d');

    // Fill background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, headerHeight);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, headerWidth, headerHeight);

    // Add text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(filename.replace(/-/g, ' ').toUpperCase(), headerWidth / 2, headerHeight / 2);

    // Save the image
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(`images/headers/${filename}.jpg`, buffer);
}

// Generate content images
function generateContentImage(filename, color) {
    const canvas = createCanvas(contentWidth, contentHeight);
    const ctx = canvas.getContext('2d');

    // Fill background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, contentHeight);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, contentWidth, contentHeight);

    // Add text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(filename.replace(/-/g, ' ').toUpperCase(), contentWidth / 2, contentHeight / 2);

    // Save the image
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(`images/content/${filename}.jpg`, buffer);
}

// Generate all header images
Object.keys(colors).forEach(section => {
    generateHeaderImage(section, colors[section]);
});

// Generate content images based on content-data.js
const contentData = require('./content-data.js');
Object.values(contentData).forEach(section => {
    if (section.items) {
        section.items.forEach(item => {
            const filename = item.image.split('/').pop().replace('.jpg', '');
            generateContentImage(filename, colors[section.title.toLowerCase().replace(/\s+/g, '-')]);
        });
    }
}); 