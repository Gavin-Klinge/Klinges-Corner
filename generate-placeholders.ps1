# Create directory if it doesn't exist
$gamesDir = "images/games"
if (-not (Test-Path $gamesDir)) {
    New-Item -ItemType Directory -Path $gamesDir -Force
}

# Function to create a placeholder image with text
function Create-PlaceholderImage {
    param (
        [string]$filename,
        [string]$title,
        [string]$subtitle,
        [string]$backgroundColor
    )
    
    $html = @"
<!DOCTYPE html>
<html>
<head>
    <title>$title</title>
    <style>
        body { margin: 0; padding: 0; background-color: $backgroundColor; }
        .container {
            width: 800px;
            height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            font-family: Arial, sans-serif;
        }
        h1 { font-size: 48px; margin-bottom: 10px; }
        p { font-size: 24px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>$title</h1>
        <p>$subtitle</p>
    </div>
</body>
</html>
"@
    
    $htmlPath = "$gamesDir/$filename.html"
    $html | Out-File -FilePath $htmlPath -Encoding utf8
    
    Write-Host "Created HTML for $filename"
}

# Create placeholder images
Create-PlaceholderImage -filename "math" -title "Math Quest" -subtitle "Mathematics Game" -backgroundColor "#4CAF50"
Create-PlaceholderImage -filename "language" -title "Word Wizard" -subtitle "Language Game" -backgroundColor "#2196F3"
Create-PlaceholderImage -filename "science" -title "Science Lab" -subtitle "Science Game" -backgroundColor "#F44336"
Create-PlaceholderImage -filename "geometry" -title "Geometry Dash" -subtitle "Geometry Game" -backgroundColor "#9C27B0"
Create-PlaceholderImage -filename "algebra" -title "Algebra Adventure" -subtitle "Algebra Game" -backgroundColor "#FF9800"
Create-PlaceholderImage -filename "reading" -title "Story Quest" -subtitle "Reading Game" -backgroundColor "#009688"
Create-PlaceholderImage -filename "grammar" -title "Grammar Hero" -subtitle "Grammar Game" -backgroundColor "#673AB7"
Create-PlaceholderImage -filename "vocabulary" -title "Vocabulary Voyage" -subtitle "Vocabulary Game" -backgroundColor "#E91E63"

Write-Host "Placeholder HTML files created in $gamesDir"
Write-Host "To convert these to images, you can use a browser's screenshot tool or a tool like wkhtmltoimage" 