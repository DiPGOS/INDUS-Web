# IndusTechSol – Landing Page

A clean, professional one-paged static landing site for IndusTechSol. Content and image paths are driven by `content.json` so copy and assets can be updated without editing the HTML.

---

## Project structure

```
INDUS-Web/
├── index.html          # Single-page template (content injected from JSON)
├── content.json        # Copy, nav, and image paths (single source of truth)
├── styles.css          # Main styles (theme, layout, components)
├── main.js             # Content loading, header behaviour, animations
├── package.json        # Node project and dev server scripts
├── package-lock.json
├── tailwind.config.js  # Optional Tailwind config
├── .gitignore
├── Readme.md           # This file
└── assets/
    ├── css/
    │   └── tailwind.css
    ├── data/
    │   └── content.json
    ├── images/
    │   ├── Logo/
    │   │   ├── logo.webp
    │   │   └── logo.webp
    │   ├── main.png
    │   ├── Refrence Images/
    │   │   └── main_ref.png
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

- **HTML** – Single `index.html` with semantic sections and IDs for content injection.
- **CSS** – `styles.css` with CSS custom properties for theme (navy base, **blue accent**). No build step.
- **Fonts** – **[Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)** (headings and body) and [Material Symbols Outlined](https://fonts.google.com/icons) for icons. Plus Jakarta Sans is used for a consistent, professional look.
- **Data** – `content.json` at project root. `main.js` fetches it and injects title, meta, header, hero, sections, and footer.
- **Dev server** – [serve](https://www.npmjs.com/package/serve) for local development so `content.json` and assets load correctly.

---

## Design and branding

- **Default accent colour: blue.** Primary buttons, links, highlights, and decorative elements use a blue palette (`--accent-400`, `--accent-500`, etc.) defined in `styles.css`. Backgrounds remain navy/dark for contrast.
- **Typography: Plus Jakarta Sans.** One font family for both display and body keeps the layout professional and readable across sections.

---

## Content model (`content.json`)

All user-facing text and image paths live in `content.json`. The script in `main.js` maps this data into the DOM.

| Key | Purpose |
|-----|--------|
| `meta` | `title`, `description`, `favicon`. |
| `header` | `logoText`, `logo` (`{ light, dark }`), `nav`, `ctaText`. |
| `hero` | `image`, `headline`, copy and stats. |
| `sections` | Intro, products, AI, pain points, why, CTA. |
| `footer` | `companyName`, `tagline`, `year`, `links`. |
| `images` | Central paths: `logo`, `favicon`, `hero`, `dipgosDashboard`, `autonomousStudio`, etc. |

**Logo and favicon:** Place `logo.webp` and `logo.webp` in `assets/images/Logo/`. The header uses the light logo on the transparent hero and switches to the dark logo when scrolled. Set `meta.favicon` or `images.favicon` in `content.json` (e.g. `logo.webp`).

---

## Development

**Requirements:** [Node.js](https://nodejs.org/) (v18+ recommended).

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. The page loads and injects content from `content.json`.

**Scripts:**

| Command | Description |
|---------|-------------|
| `npm run dev` | Serve site at port 3000 (same as `npm start`). |
| `npm start` | Same as `npm run dev`. |
| `npm run preview` | Serve at port 5000. |

**Note:** Use the dev server (or another static server) for local testing. Opening `index.html` via `file://` can block loading `content.json` due to browser security.

---

## Design / content spec (reference)

1. **Header** – Fixed, transparent over hero; solid background on scroll. Logo (light/dark), nav, CTA.
2. **Hero** – Full-viewport background (`assets/images/main.png`), headline, sub copy, primary/secondary actions, stats bar.
3. **Intro** – “Until now, construction ran on fragmented tools…” / “Introducing DiPGOS…”.
4. **Products** – DiPGOS, ACCS, CPDS, AOS cards.
5. **Physical AI** – “Physical AI-powered Project Operating System” and supporting copy.
6. **Pain points** – Problems and solutions.
7. **Why** – Reasons / differentiators.
8. **CTA** – Final call-to-action and contact.
9. **Footer** – Tagline, links, copyright.

---

## Deployment

Deploy the project as a static site (e.g. GitHub Pages, Netlify, Vercel). Exclude `node_modules`. Ensure `content.json` is served with a JSON MIME type and from the same origin so the fetch in `main.js` succeeds.
