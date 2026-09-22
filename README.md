# natalis

A life simulator about the part you don't choose.

You are born somewhere — a country, a year, a household, a body — and the game
runs the life forward one year at a time. A character born in Lagos in 1962 gets
the Biafran war, NEPA power cuts, the oil boom and the structural adjustment;
one born in Osaka in 1980 gets the bubble, the Kobe earthquake and the graduate
ice age. Not a generic set of stats with a flag pasted on top.

Two ways to play, chosen once per life:

- **Inhabit** — you answer the choices, take the work, spend the years.
- **Witness** — the life goes as it goes and you read it. Same simulation, same
  content; the character answers for themselves.

The target feeling is **sonder**: the sense that the stranger on the platform
has a life as vivid and particular as your own. The prose is the mechanic. Stats
exist, but the sentence is the thing.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:5173/natalis/
```

## Verifying it

```bash
npm run build          # must pass
npm test               # full suite, including the simulation guardrails
npm run test:fast      # unit + static audits, seconds not minutes
npm run check-flags    # every registered flag is set and consumed
npm run check-events   # reachability: dead guards, enum domains, phase/year windows
npm run sim            # firing-rate report — what ACTUALLY fires, per 100 lives
```

`npm run sim` is the load-bearing one. Every static audit here answers whether
content *could* fire; only running the engine answers whether it *does*. The
project has twice shipped large bodies of writing that no player could reach —
a prison arc with no entrance, 15,000 lines of prose behind a first-match-wins
if-chain — and both were invisible to a green test suite.

**Measure what fires, not what exists.**

## Where things are

| | |
|---|---|
| `src/data/countries.js` | the roster — demography, regime history, religion and ethnicity weights, literacy by era |
| `src/data/events/` | ~8,000 character events across ~470 modules, grouped by `geographic/`, `thematic/`, `lifecycle/`, `sonder/`, `followthrough/`, `prison/`, `specific_lives/` |
| `src/data/worldEvents.js` | history that arrives whether or not you asked |
| `src/engine/tick.js` | the year: event selection, aging, death, careers |
| `src/engine/lifeCourse.js` | work, partnering, marriage, children, retirement at era- and place-accurate rates |
| `src/engine/yearTexture.js` | the quiet-year prose layer |
| `src/store/gameStore.js` | Zustand store, save/load |
| `scripts/` | the audits |

React + Vite + Zustand. No backend. All content is plain JS object arrays.

Contributor and design notes live in `CLAUDE.md`; build history in
`docs/roadmap.md` and `docs/codebase-state.md`.
