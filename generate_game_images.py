import os
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

# Define the games to generate
games = [
    # Existing games
    {"name": "math", "title": "Math Quest", "subtitle": "Mathematics Game", "color": "#4CAF50"},
    {"name": "language", "title": "Word Wizard", "subtitle": "Language Game", "color": "#2196F3"},
    {"name": "science", "title": "Science Lab", "subtitle": "Science Game", "color": "#F44336"},
    {"name": "geometry", "title": "Geometry Dash", "subtitle": "Geometry Game", "color": "#9C27B0"},
    {"name": "algebra", "title": "Algebra Adventure", "subtitle": "Algebra Game", "color": "#FF9800"},
    {"name": "reading", "title": "Story Quest", "subtitle": "Reading Game", "color": "#009688"},
    {"name": "grammar", "title": "Grammar Hero", "subtitle": "Grammar Game", "color": "#673AB7"},
    {"name": "vocabulary", "title": "Vocabulary Voyage", "subtitle": "Vocabulary Game", "color": "#E91E63"},
    
    # New games
    {"name": "coding", "title": "Code Explorer", "subtitle": "Programming Game", "color": "#795548"},
    {"name": "history", "title": "Time Traveler", "subtitle": "History Game", "color": "#607D8B"},
    {"name": "geography", "title": "World Explorer", "subtitle": "Geography Game", "color": "#FF5722"},
    {"name": "music", "title": "Rhythm Master", "subtitle": "Music Game", "color": "#3F51B5"},
    {"name": "art", "title": "Creative Canvas", "subtitle": "Art Game", "color": "#8BC34A"},
    {"name": "logic", "title": "Brain Teaser", "subtitle": "Logic Game", "color": "#00BCD4"}
]

# Create HTML template
def create_html(game):
    return f"""<!DOCTYPE html>
<html>
<head>
    <title>{game['title']}</title>
    <style>
        body {{ 
            margin: 0; 
            padding: 0; 
            background-color: {game['color']};
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }}
        .container {{
            width: 800px;
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }}
        .container::before {{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%);
            z-index: 1;
        }}
        .content {{
            position: relative;
            z-index: 2;
            padding: 40px;
            border-radius: 16px;
            background: rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }}
        h1 {{ 
            font-size: 64px; 
            margin-bottom: 20px;
            font-weight: 700;
            text-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }}
        p {{ 
            font-size: 32px;
            opacity: 0.9;
            font-weight: 400;
        }}
        .icon {{
            font-size: 120px;
            margin-bottom: 30px;
            opacity: 0.8;
        }}
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="icon">
                <i class="fas fa-gamepad"></i>
            </div>
            <h1>{game['title']}</h1>
            <p>{game['subtitle']}</p>
        </div>
    </div>
</body>
</html>"""

# Set up Chrome options
def setup_chrome():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=800,600")
    chrome_options.add_argument("--hide-scrollbars")
    chrome_options.add_argument("--force-device-scale-factor=1")
    return chrome_options

# Generate images
def generate_images():
    # Create games directory if it doesn't exist
    os.makedirs("images/games", exist_ok=True)
    
    # Set up Chrome
    chrome_options = setup_chrome()
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    
    try:
        for game in games:
            # Create HTML file
            html_path = f"images/games/{game['name']}.html"
            with open(html_path, "w") as f:
                f.write(create_html(game))
            
            # Load the HTML file
            driver.get(f"file://{os.path.abspath(html_path)}")
            time.sleep(1)  # Wait for rendering
            
            # Take screenshot
            driver.save_screenshot(f"images/games/{game['name']}.png")
            print(f"Generated {game['name']}.png")
            
            # Remove HTML file
            os.remove(html_path)
            
    finally:
        driver.quit()

if __name__ == "__main__":
    generate_images()
    print("All game images generated successfully!") 