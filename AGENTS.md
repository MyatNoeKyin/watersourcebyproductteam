# Repository Guidelines

## Project Structure & Module Organization
This repository is a static marketing site.
- `index.html`: primary production landing page.
- `html/`: alternate design iterations (for example, `watersource_conversion_revamp_v1.html`).
- `assets/`: image assets referenced by page templates.
- `.nojekyll`: keeps static hosting behavior predictable.

Keep new media in `assets/` and update relative paths in HTML (`assets/<file-name>`). For major experiments, add a new file in `html/` instead of overwriting `index.html` first.

## Build, Test, and Development Commands
No build pipeline is required; pages are plain HTML/CSS.
- `python3 -m http.server 8080`: run a local preview server.
- `open index.html`: quick local open (without server).
- `git status`: verify changed files before commit.

If port `8080` is busy, use another port (for example `python3 -m http.server 8081`).

## Coding Style & Naming Conventions
- Use 2-space indentation in HTML/CSS blocks already present in the project.
- Prefer semantic section IDs and classes (`#why-watersource`, `.founder-card`).
- Use lowercase, hyphenated filenames for new assets and HTML variants (`new-section-v2.html`).
- Keep inline styles minimal; prefer grouped `<style>` updates for consistency.

## Testing Guidelines
There is no automated test suite configured in this repository.
Run a manual validation pass before opening a PR:
- Load page on desktop and mobile widths.
- Verify all images load and no broken `assets/` paths exist.
- Check anchor links, CTA buttons, and section spacing.
- Confirm no obvious console errors in browser DevTools.

## Commit & Pull Request Guidelines
Recent history uses concise, imperative commit subjects with optional scope prefixes:
- `style: improve functional water section layout`
- `copy: update consultation value to 399`
- `Refine footer disclaimer copy`

Follow this pattern: `<scope>: <change summary>` when possible (`style`, `copy`, `layout`, `assets`).

For PRs, include:
- Purpose and sections changed.
- Before/after screenshots for visual edits.
- Any content-source notes for copy updates.
- A short manual test checklist with results.
