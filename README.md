# Stop Big Roo

A deadpan campaign website for **Americans for Marsupial Accountability**. Big legs. Bigger agenda.

## Run

```sh
npm start
```

Open `http://localhost:3000`. Node 18+ is sufficient; no dependencies, install step, or build is required. `PORT` can override 3000. The existing Replit configuration remains compatible.

```sh
npm test
```

The tests cover all 81 quiz paths, incomplete/invalid answers, simulator ranges, public assets, HEAD requests, malformed URLs, and rejection of private/configuration paths. The test file runs directly to avoid subprocess restrictions on Windows.

## Campaign experience

- Cinematic kangaroo portrait, locally hosted Anton headline font, cream/red editorial layout, and responsive navigation.
- Six case-file dialogs with linked biological sources and separate campaign commentary.
- Six selectable subject-profile components, a messaging switch, and expandable influence files.
- Four-question quiz with back, restart, restored answer selection, and four result categories.
- Weight-slider encounter simulator, written as an imaginary matchup.
- A personal pledge saved in `localStorage` using the original `sbr_pledged` key. No fabricated global supporter count. Storage failures fall back to a pledge for the current visit.
- A downloadable 1200 × 1500 PNG campaign card, personalized after pledging. A static JPEG poster provides a fallback.
- Native sharing where available, clipboard fallback, and a visible copyable link if neither succeeds. Local previews share the repository URL instead of localhost.

The main content remains readable without JavaScript. Interactive features require JavaScript. Keyboard focus, native dialog dismissal, mobile navigation state, and reduced-motion styles are included.

## Files and assets

- `index.html`: semantic content and metadata.
- `styles.css`: responsive campaign design.
- `app.js`: local interactions and exported quiz/simulator logic.
- `assets/roo-portrait.webp`: generated campaign artwork, approximately 128 KiB.
- `assets/anton.ttf` and `assets/Anton-OFL.txt`: locally hosted Google Fonts Anton, SIL Open Font License.
- `assets/campaign-poster.jpg`: downloadable poster and social metadata image.
- `server.js`: serves only public page files and allowed asset filenames. Does not serve `.git`, `.replit`, application source files other than the public browser script, or package metadata.

Artwork was created specifically for this campaign with OpenAI image generation. It is an illustration, not photographic evidence of an incident. No remote fonts, analytics, mailing-list service, database, donations, or personal-data submission are used.

## Editorial boundaries

This is a fictional advocacy campaign, not a registered charity. Keep the brief footer disclosure. The campaign speaks in a straight-faced voice; its invented threat ratings, quiz, simulator and conspiracy framing are jokes. Wildlife should be respected and left at a distance.

Biological sources are linked directly in the case files:

- [Australian Museum: Red Kangaroo](https://australian.museum/learn/animals/mammals/red-kangaroo/)
- [The kangaroo’s tail propels and powers pentapedal locomotion](https://pmc.ncbi.nlm.nih.gov/articles/PMC4126630/)
- [Boxing in Red Kangaroos: Aggression or Play?](https://escholarship.org/uc/item/0dv2h5zv)

## Deployment

Import or update this repository on Replit, then run/publish using the existing `.replit` configuration. Include `index.html`, `styles.css`, `app.js`, `server.js`, `package.json`, and the `assets` folder. Static hosting can also serve the HTML/CSS/JS/assets directly. The site is no longer a single self-contained HTML file.

The September 2026 redesign is delivered on `improve/campaign-redesign` for review. Creating the branch or pull request does not merge or republish the live site.

## Verified during the redesign

- `npm test`: all three tests pass, including 81 quiz combinations and HTTP checks.
- Browser: all six case files, Escape/close behavior, anatomy selection, messaging switch, quiz high/low outcomes, previous-answer restoration, restart, slider keyboard control, and pledge persistence after reload.
- Campaign card: actual browser download confirmed and visually checked at 1200 × 1500.
- Responsive checks: 320 px, 390 px, 768 px and desktop; no horizontal page overflow at checked narrow widths after the compact-headline fix.
- No browser console warnings or errors observed during the interaction checks.
