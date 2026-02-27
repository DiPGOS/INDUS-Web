# IndusTechSol – Landing Page

A clean, professional one-paged static landing site for IndusTechSol. All copy, navigation, and image paths are defined in the `DATA` object inside `main.js`, so the HTML file stays mostly structural.

---

## Project structure

```
INDUS-Web/
├── index.html          # Single-page template wired to JS data
├── styles.css          # Main styles (theme, layout, components, glassmorphism)
├── main.js             # DATA model, DOM wiring, interactions, theme toggle
├── Readme.md           # This file
└── public/
    └── images/
        ├── Logo/
        │   ├── logo.webp
        │   └── logo_rectangle.webp
        ├── main.webp
        ├── main_light.webp
        ├── accs/
        ├── cpds/
        └── dipgos_dashboard/
```

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

## Content model (`main.js` → `DATA`)

All user-facing text and image paths live in the `DATA` object inside `main.js`. The script maps this data into the DOM on load.

| Key | Purpose |
|-----|--------|
| `meta` | `title`, `description`. |
| `header` | `logo` (`{ square, rectangle }`), `nav`. |
| `hero` | `imageDark`, `imageLight`, `headline`, `subEyebrow`, `subMain`. |
| `intro` | Headline, body copy, and dashboard images for DiPGOS. |
| `products` | Cards for CPDS, ACCS, AOS. |
| `ai` | AI capability chips (icons + labels). |
| `footer` | Tagline, year, product links, legal links. |

**Logo and favicon:** Place `logo.webp` and `logo_rectangle.webp` in `public/images/Logo/`. The header uses the rectangle logo where appropriate, and the favicon is referenced in `index.html` via `<link rel="icon" ...>`.

---

## Development

- **No build step.** This is a pure static site (`index.html`, `styles.css`, `main.js`).
- **Local preview:** Open `index.html` directly in a browser, or serve the folder with any static server (e.g. VS Code Live Server, `npx serve .`, or your tool of choice).
- **Assets:** All images live under `public/images/...` and are referenced via relative paths from `index.html` / `main.js`.

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
