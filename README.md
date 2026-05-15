# WaterSource Landing Page

Static marketing landing page for WaterSource Singapore.

The production entrypoint is `index.html`. Alternate page iterations live in `html/`, and shared images or icons live in `assets/`.

## Project Structure

```text
.
├── index.html
├── html/
│   ├── watersource_conversion_revamp_v1.html
│   └── watersource_mindvalley_visual_v3.html
├── assets/
│   ├── hero-water-glasses.jpg
│   ├── watersource-bottle-lifestyle.jpg
│   └── ...
├── .nojekyll
└── README.md
```

## How to Run Locally

This project does not require a build step or package install. It is plain HTML/CSS with static assets.

From the project root, start a local server:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

If port `8080` is already in use, run the server on another port:

```bash
python3 -m http.server 8081
```

Then open:

```text
http://localhost:8081
```

You can also open `index.html` directly in a browser, but using the local server is preferred because it more closely matches static hosting behavior.

## Development Flow

1. Edit `index.html` for production page updates.
2. Add major experiments or alternate layouts as new files inside `html/`.
3. Place new images, icons, and media in `assets/`.
4. Reference assets with relative paths such as:

```html
<img src="assets/example-image.jpg" alt="Example image">
```

For files inside `html/`, use paths relative to that folder:

```html
<img src="../assets/example-image.jpg" alt="Example image">
```

## Common Commands

```bash
# Start local preview server
python3 -m http.server 8080

# Check changed files
git status

# See unstaged changes
git diff
```

## Manual QA Checklist

Before publishing or opening a pull request, check:

- Desktop layout loads correctly.
- Mobile layout loads correctly.
- Images and icons render without broken paths.
- CTA buttons and anchor links work.
- Section spacing looks intentional.
- Browser console has no obvious errors.

## Deployment Notes

The deployable file is:

```text
index.html
```

The `.nojekyll` file is included so static hosting platforms do not apply Jekyll processing.

## Naming Conventions

- Use lowercase, hyphenated filenames for new assets and HTML variants.
- Keep new media inside `assets/`.
- Use semantic section IDs and class names where possible.
- Keep styles grouped inside the page unless a broader styling structure is introduced later.
