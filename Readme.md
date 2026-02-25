# IndusTechSol – Landing Page

A clean, modern one-paged static landing site for IndusTechSol. All visible text and image paths are driven by a single JSON file so updates can be made without editing the HTML.

---

## Project structure

```
INDUS-Web/
├── index.html          # Single-page template (structure only; content injected from JSON)
├── content.json        # All copy, nav, and image paths (single source of truth)
├── package.json        # Node project and scripts (dev server)
├── package-lock.json   # Locked dependency versions
├── tailwind.config.js # Tailwind config (optional; CDN used in index.html)
├── .gitignore
├── Readme.md           # This file
└── assets/
    ├── css/
    │   └── tailwind.css
    ├── data/
    │   └── content.json
    ├── images/         # All site images
    │   ├── Logo/       # Header logo and favicon (light + dark variants)
    │   │   ├── logo_light.webp   # Logo on transparent hero
    │   │   └── logo_dark.webp    # Logo on solid header (scroll)
    │   ├── main.png    # Hero full-screen background
    │   ├── Refrence Images/
    │   │   └── main_ref.png   # Layout reference for hero + header
    │   ├── dipgos_dashboard/
    │   │   ├── dipgos_dashboard_light.webp
    │   │   └── dipgos_dashboard_dark.webp
    │   ├── atonomus_cognative_construction_studio/
    │   │   ├── accs_light.webp
    │   │   └── accs_dark.webp
    │   └── cpds/
    └── js/
        └── main.js
```

`node_modules/` is created by `npm install` and is ignored by Git.

---

## Tech stack

- **HTML** – Single `index.html` as a minimal template with fixed sections and element IDs.
- **CSS** – [Tailwind CSS](https://tailwindcss.com/) via CDN (no build step). Custom theme (primary, accent, fonts) in a `<script id="tailwind-config">` block.
- **Fonts** – [Inter](https://fonts.google.com/specimen/Inter) and [Material Symbols Outlined](https://fonts.google.com/icons) from Google Fonts.
- **Data** – `content.json` at project root. A small inline script fetches it and injects title, meta, header, hero, sections, and footer. No backend; static hosting only.
- **Dev server** – [serve](https://www.npmjs.com/package/serve) to serve the project so `content.json` loads without CORS issues (required for local development).

---

## Content model (`content.json`)

All user-facing text and image paths live in `content.json`. The page script maps this data into the DOM.

| Key | Purpose |
|-----|--------|
| `meta` | `title`, `description` (page title and meta description), `favicon` (path to favicon; e.g. `assets/images/Logo/logo_light.webp`). |
| `header` | `logoText`, `logo` (object: `{ light, dark }` – paths to header logo for transparent vs solid header), `nav` (array of `{ label, href }`), `ctaText`. |
| `hero` | `image` (path to hero background), `headline` (centered hero text). |
| `sections.intro` | First block: `line1`, `line2` (DiPGOS intro). |
| `sections.dipgosDescription` | Second block: `paragraph` (domain-built OS). |
| `sections.physicalAI` | Third block: `heading`, `body1`, `body2` (Physical AI). |
| `footer` | `companyName`, `tagline`, `year`, `links` (optional). |
| `images` | Central list: `logo` (`{ light, dark }`), `favicon`, `hero`, `reference`, `dipgosDashboard` (`{ light, dark }`), `autonomousStudio` (`{ light, dark }`). |

**Logo and favicon:** Place `logo_light.webp` and `logo_dark.webp` in `assets/images/Logo/`. The header uses the light logo on the transparent hero and switches to the dark logo when scrolled (solid header). Favicon is set from `meta.favicon` or `images.favicon` (e.g. `logo_light.webp`). All image paths use the structure above (`.webp` in `Logo/`, `dipgos_dashboard/`, `atonomus_cognative_construction_studio/`).

To change copy or images: edit **only** `content.json`; leave `index.html` unchanged.

---

## Development

**Requirements:** [Node.js](https://nodejs.org/) (v18+ recommended).

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**. The page will load and inject content from `content.json`.

**Scripts:**

| Command | Description |
|---------|-------------|
| `npm run dev` | Serve site at port 3000 (same as `npm start`). |
| `npm start` | Same as `npm run dev`. |
| `npm run preview` | Serve at port 5000. |

**Note:** Opening `index.html` directly (e.g. `file://`) can block loading `content.json` due to browser security. Always use the dev server or another static server for local testing.

---

## Design / content spec (reference)

This is the intended layout and copy (all of it is stored in `content.json`).

1. **Header** – Fixed at top with transparent background (switches to solid with dark text on scroll).
2. **Hero** – Full-viewport background image (`assets/images/main.png`) with centered headline: *"We are Shaping the Future of Engineering & Construction"*.  
   Layout reference: `assets/images/Refrence Images/main_ref.png`.

3. **Next section** –  
   *"Until now, construction ran on fragmented tools. Now it runs on an Operating System."*  
   *"Introducing DiPGOS - the world's first Project Operating System - design, execution, and operations unified in a single intelligent platform."*

4. **Next section** –  
   *"DiPGOS is a domain-built Operating System for engineering and construction delivery. It provides a unified, integrated view of project operations and control by treating construction activities as production systems rather than isolated tasks."*

5. **Next section** –  
   **Heading:** *"Physical AI-powered Project Operating System"*  
   *"A System that reflects reality – AI that is Physics-informed, context-aware & designed with an understanding of how things work."*  
   *"WHERE INTELLIGENCE ISNT JUST ARTIFICIAL, BUT PHYSICALLY & OPERATIONALLY AWARE"*

---

## Deployment

The project is static. Deploy the whole folder (excluding `node_modules`) to any static host (e.g. GitHub Pages, Netlify, Vercel, or any server that serves files). Ensure the server is configured so `content.json` is served with a correct MIME type (e.g. `application/json`) and that the document is served from the same origin so the fetch of `content.json` succeeds.
