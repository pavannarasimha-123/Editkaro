# Editkaro.in — Portfolio Page 

## Folder structure
```
Editkaro-Portfolio/
│
├── index.html          → page structure/markup
├── style.css            → all styling (dark, cinematic "editing timeline" theme)
├── script.js             → category data, filtering, lightbox, mobile nav, timecode
│
├── images/              → 9 placeholder category poster thumbnails (SVG)
│
├── videos/              → empty — drop real Editkaro.in mp4 clips here
│   └── README.txt         → naming convention + how to wire a clip to script.js
│
└── icons/               → UI icons used across the page
    ├── play.svg            → card play button
    ├── close.svg            → lightbox close button
    ├── menu.svg             → mobile nav hamburger
    ├── instagram.svg        → footer social link
    ├── youtube.svg          → footer social link
    ├── linkedin.svg         → footer social link
    └── logo-mark.svg        → spare diamond mark (optional use)
```

## Concept
Editkaro.in is a video-editing/social-media agency, so the design borrows from
a non-linear editor (NLE) instead of a generic grid:
- A live 24fps timecode ticks in the hero.
- The category filter is a horizontal **timeline scrubber** with a sliding
  playhead — each category is a colored "track" (Short-Form, Long-Form,
  Gaming, Football Edits, eCommerce Ads, Documentary, Color Grading, Anime, Ads).
- Clip cards show a hover scanline + zoom, and open a lightbox on click.

## Run it locally
No build step or dependencies. Just open `index.html` in a browser, or serve
the folder locally:

```bash
# Python
python3 -m http.server 8000
# then visit http://localhost:8000

# or Node
npx serve .
```

Keep the whole `Editkaro-Portfolio/` folder together — `index.html` loads
`style.css`, `script.js`, and everything in `images/`/`icons/` by relative
path, so the structure has to stay intact.

## Adding real client footage
Open `script.js` and find the `CLIPS` array near the top. Each entry looks like:

```js
{
  cat:'shortform',
  title:'Reel Drop — Weekend Series',
  tc:'00:32',
  thumb:'images/thumb-shortform.svg',   // poster image, always shown
  video:'',                             // optional — mp4 path, enables hover preview
  desc:'...'
}
```

1. **Poster images** — replace the placeholder SVGs in `images/` with real
   frame grabs or thumbnails (jpg/png/webp all work), and update each clip's
   `thumb` path to match.
2. **Hover-preview video** — drop an mp4 into `videos/` (see
   `videos/README.txt`), then set that clip's `video` field to its path, e.g.
   `video:'videos/shortform-reel-drop.mp4'`. Cards with a `video` field
   auto-play a muted loop on hover; cards without one just show the poster.
3. **Icons** — swap any file in `icons/` with your own artwork as long as the
   filename stays the same (`play.svg`, `close.svg`, etc.), or update the
   `src` paths in `index.html`/`script.js` if you rename them.
4. `CATEGORIES` at the top of `script.js` controls the 9 track names/colors —
   edit freely if Editkaro's actual category list differs.

## Deployment (pick one — all free)
**GitHub Pages**
1. Create a new repo, push these three files (`index.html`, `style.css`, `script.js`).
2. Repo Settings → Pages → Deploy from branch → `main` / root.
3. Your live URL appears in that same settings page after a minute.

**Netlify Drop**
1. Go to https://app.netlify.com/drop
2. Drag the project folder in — you get a live URL instantly, no account needed
   for a quick preview (sign up to keep it permanently).

**Vercel**
```bash
npm i -g vercel
cd editkaro-portfolio
vercel
```

## Checklist against the brief
- [x] Visually engaging, interactive portfolio page
- [x] HTML, CSS, JS — vanilla, no frameworks
- [x] Video preview cards with hover animation + click-to-expand lightbox
- [x] Categories with clear navigation (timeline scrubber filter)
- [x] Fully responsive (mobile nav, 1-column grid, scrollable scrubber)
- [ ] Deployed — pick one option above and publish
