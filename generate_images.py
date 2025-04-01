from PIL import Image, ImageDraw, ImageFont
import os

# Create directories if they don't exist
os.makedirs('images/headers', exist_ok=True)
os.makedirs('images/content', exist_ok=True)

# Colors for different sections
colors = {
    'classroom-hub': '#4CAF50',
    'professional-development': '#2196F3',
    'life-skills': '#FF9800',
    'parent-hub': '#9C27B0'
}

def create_gradient_image(width, height, color, text, output_path):
    # Create a new image with a gradient background
    image = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(image)
    
    # Create gradient
    for y in range(height):
        # Calculate gradient color
        r1, g1, b1 = tuple(int(color[i:i+2], 16) for i in (1, 3, 5))
        r2, g2, b2 = 0, 0, 0
        r = int(r1 + (r2 - r1) * y / height)
        g = int(g1 + (g2 - g1) * y / height)
        b = int(b1 + (b2 - b1) * y / height)
        
        # Draw line
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add text
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
    except:
        font = ImageFont.load_default()
    
    # Center text
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # Draw text
    draw.text((x, y), text, font=font, fill='white')
    
    # Save image
    image.save(output_path, 'JPEG')

# Generate header images
for section, color in colors.items():
    create_gradient_image(
        1920, 1080,
        color,
        section.replace('-', ' ').upper(),
        f'images/headers/{section}.jpg'
    )

# Generate content images
content_items = [
    ('digital-tools', colors['classroom-hub']),
    ('interactive-activities', colors['classroom-hub']),
    ('assessment-strategies', colors['classroom-hub']),
    ('teaching-strategies', colors['professional-development']),
    ('technology-integration', colors['professional-development']),
    ('leadership-skills', colors['professional-development']),
    ('financial-literacy', colors['life-skills']),
    ('communication-skills', colors['life-skills']),
    ('time-management', colors['life-skills']),
    ('supporting-learning', colors['parent-hub']),
    ('digital-safety', colors['parent-hub']),
    ('parent-teacher-communication', colors['parent-hub'])
]

for item, color in content_items:
    create_gradient_image(
        800, 600,
        color,
        item.replace('-', ' ').upper(),
        f'images/content/{item}.jpg'
    )

print("All images have been generated successfully!") 