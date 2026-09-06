# Stop Big Roo

A satirical one-page website for **Americans for Marsupial Accountability**, a fictional advocacy
group asking the question nobody in Washington will: *who is protecting us from the kangaroo?*

**This is parody.** It is not a registered 501(c)(3), the EIN is a joke, and no donations are
solicited or accepted. The disclaimer in the footer says so plainly and should stay there.

## What's on the page

| Section | What it does |
| --- | --- |
| Hero | Sticky nav, scroll-driven "national threat level" gauge that creeps toward SEVERE as you read |
| The Numbers | Stat counters that animate when scrolled into view |
| Know Your Adversary | Clickable kangaroo schematic with six annotated threat components |
| The Dossier | Six real, documented kangaroo behaviors, framed alarmingly |
| Counter-Messaging | Toggle between "What They Say" and "What We Found" |
| Your Risk | Four-question exposure quiz with a scored verdict |
| Encounter Simulator | Body-weight slider that models a fight you always lose |
| Follow the Money | The marsupial–industrial complex |
| Take the Pledge | Counter with a one-click pledge, remembered in `localStorage` |

Everything is in a single `index.html` — no build step, no dependencies, no framework.

## Note on the facts

The underlying behaviors are real: kangaroos dominate Australian animal–vehicle collision claims,
they drown pursuing dogs, males box for practice, embryonic diapause is real, hopping is
elastically cheap at speed, and fatal attacks — while genuinely rare — have happened. The
conspiratorial framing wrapped around those facts is invented for comic effect.

## Running it

```bash
npm start
```

Then open http://localhost:3000. `server.js` is a zero-dependency Node static server that honors
`process.env.PORT`, so it works unchanged on Replit.

You can also just open `index.html` directly in a browser — it is fully self-contained.

## Deploying on Replit

Import this repo. The included `.replit` runs `npm start` and maps port 3000 to 80.
