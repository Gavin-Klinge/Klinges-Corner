# Klinge's Corner - Education Meets Innovation

A comprehensive educational platform focused on STEM education and professional development, hosted on GitHub Pages.

## Project Structure

```
├── index.html              # Main landing page
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript functionality
├── pages/                  # Subject-specific pages and resources
│   ├── template.html       # Base template for subject pages
│   ├── subject.js          # Common subject page functionality
│   ├── subject.css         # Common subject page styles
│   ├── mathematics.html    # Mathematics subject page
│   ├── science.html        # Science subject page
│   ├── programming.html    # Programming subject page
│   ├── ide.html           # Interactive Development Environment
│   ├── ide.js             # IDE functionality
│   ├── ide.css            # IDE styles
│   └── resources/         # Subject-specific resources
│       ├── spheroblueprints/
│       ├── pd/
│       ├── poe/
│       ├── ozaria/
│       ├── iconicdrones/
│       ├── finances/
│       ├── games/
│       ├── digitalliteracy/
│       ├── cs50/
│       ├── csp/
│       └── codecombat/
```

## Features

- Interactive learning modules
- Professional development resources
- Parent hub
- Classroom hub
- STEM-focused content
- Gamified education elements
- 3D creativity tools
- Client-side code execution using Pyodide
- Static site hosting for fast loading
- Custom domain support (www.klingescorner.com)

## Getting Started

1. Clone the repository
2. Open `index.html` in your web browser
3. Navigate through different sections using the navigation menu

## Development

The project uses a template-based approach where subject pages inherit from `template.html`. Common styles and functionality are shared through `subject.css` and `subject.js`.

Since this is a static site hosted on GitHub Pages:
- All code execution happens client-side
- No server-side processing is required
- Content is served directly from GitHub's CDN
- Updates are deployed automatically when changes are pushed to the main branch

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/klinges-corner.git
   cd klinges-corner
   ```

2. Make your changes locally

3. Test your changes by opening `index.html` in your browser

4. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

### GitHub Pages Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by GitHub Actions.

To enable GitHub Pages:
1. Go to your repository's Settings
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. The site will be available at `https://yourusername.github.io/klinges-corner`

### Custom Domain Setup

The site uses a custom domain (www.klingescorner.com). To set up a custom domain:
1. Add your domain to the CNAME file
2. Configure your DNS settings to point to GitHub Pages
3. Enable HTTPS in your repository's GitHub Pages settings

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Monaco Editor for the code editor
- Pyodide for Python execution in the browser
- Font Awesome for icons
- GitHub Pages for hosting

## Support

For support, please open an issue in the GitHub repository or contact the development team. 