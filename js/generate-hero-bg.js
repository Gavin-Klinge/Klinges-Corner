const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to 1920x1080 for high resolution
canvas.width = 1920;
canvas.height = 1080;

// Create gradient background
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, '#1a1a1a');
gradient.addColorStop(1, '#000000');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add abstract geometric shapes
ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
ctx.lineWidth = 2;

// Draw circles
for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 100 + 50;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
}

// Draw lines
for (let i = 0; i < 30; i++) {
    const x1 = Math.random() * canvas.width;
    const y1 = Math.random() * canvas.height;
    const x2 = Math.random() * canvas.width;
    const y2 = Math.random() * canvas.height;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Add dots
ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 3 + 1;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

// Convert canvas to image
const img = canvas.toDataURL('image/jpeg', 0.9);

// Create a link to download the image
const link = document.createElement('a');
link.download = 'hero-bg.jpg';
link.href = img;
link.click(); 