# Portfolio Website

Portfolio website for Goce Mojsoski.

## Development

### Quick Start

Start a local development server:

```bash
npm run dev
```

This will start a server at `http://localhost:8080` (or another port if 8080 is in use).

### Available Scripts

- `npm run dev` or `npm start` - Start development server on port 8080
- `npm run serve` - Same as `npm run dev`
- `npm run preview` - Start preview server on port 3000

### Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/                # Stylesheets
├── js/                 # JavaScript files
├── images/             # Images and assets
├── files/              # PDFs and other files
└── Caddyfile          # Caddy web server configuration
```

## Build

Before deploying, you need to build the Tailwind CSS:

```bash
npm run build:css
```

This generates `css/tailwind.css` from the Tailwind configuration. The build script is automatically run when using `npm run dev` or `npm run serve`.

## Technologies

- HTML5
- CSS3 (Custom CSS + Tailwind CSS built with PostCSS)
- Vanilla JavaScript
- Caddy (for production serving)

## Notes

- The site uses Tailwind CSS built locally (requires `npm run build:css` before deployment)
- All JavaScript is vanilla (no frameworks)
- The site is fully static and can be served from any static file server
- The deployment script automatically builds CSS before copying files

