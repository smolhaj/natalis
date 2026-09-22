/** @type {import('tailwindcss').Config} */

// The palette was labelled "BitLife-inspired" and behaved like it: an iOS-grey
// chrome with eight saturated accents, candy stat bars over a third of the
// screen, and the prose — the thing CLAUDE.md calls the mechanic — in a small
// card underneath. The design document asks for the opposite of this on four
// separate lines: literary not gamey, invisible systems, no "+5 Happiness!"
// framing, the prose is the mechanic.
//
// So: paper and ink. One warm neutral ramp, one reserved accent for things you
// can press, and saturation kept for the two places it carries real
// information — a body in trouble, and money arriving or leaving. The token
// NAMES are unchanged, so ~3,700 lines of existing JSX pick this up without
// being touched.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Project tokens. Declared after the palette block above so both land in
      // the same `colors` map.
      colors: {
        // The paper.
        'natalis-bg':      '#f4f2ed',
        'natalis-surface': '#fdfcf9',
        'natalis-raised':  '#ffffff',
        'natalis-border':  '#e2ddd2',
        'natalis-rule':    '#d6d0c2',
        // The ink. Four weights, because a page needs a hierarchy more than it
        // needs colours.
        'natalis-text':    '#1c1a16',
        'natalis-dim':     '#403b33',
        'natalis-muted':   '#7d766a',
        'natalis-faint':   '#a9a297',

        // One accent, for things that respond to a press. Desaturated enough to
        // sit next to prose without shouting over it.
        'natalis-accent':  '#3f5670',
        'natalis-accent-soft': '#eceef2',

        // Kept semantic, and only used where the meaning is real.
        'natalis-alarm':   '#8c3a2e',   // a body in trouble
        'natalis-gain':    '#3f6146',   // money arriving
        'natalis-loss':    '#8c3a2e',   // money leaving

        // The old accent names are still referenced across the components. They
        // now resolve to the muted ramp rather than the candy one, so nothing
        // breaks and nothing shouts.
        'bit-blue':    '#3f5670',
        'bit-green':   '#3f6146',
        'bit-red':     '#8c3a2e',
        'bit-orange':  '#8a6635',
        'bit-yellow':  '#8a7435',
        'bit-purple':  '#5b4a6b',
        'bit-teal':    '#3f6470',
        'bit-pink':    '#7b4356',

        // ── The default palette, muted ─────────────────────────────────────
      // Roughly 200 usages across the components reach past the natalis tokens
      // straight into Tailwind's default scales: bg-blue-50, text-red-500,
      // bg-amber-50, text-violet-900. Rewriting 200 class attributes by hand
      // would be a large diff that is easy to get subtly wrong and impossible
      // to review. Remapping the scales themselves is one change that reaches
      // all of them, and keeps the semantic intent the author wrote — a world
      // event still reads as a world event, a warning still reads as a warning
      // — at a saturation that sits beside prose instead of over it.
      //
        // Each ramp is the same hue family as Tailwind's, pulled toward the paper.
        white: '#fdfcf9',   // makes every bg-white the paper surface

        blue: {
          50: '#eceef2', 100: '#dde1e9', 200: '#c3cad6', 300: '#9aa6b9',
          400: '#6e7e96', 500: '#4e6180', 600: '#3f5670', 700: '#35485d',
          800: '#2c3a4a', 900: '#242e3a', 950: '#181f27',
        },
        indigo: {
          50: '#eeedf3', 100: '#e0dee9', 200: '#c8c4d7', 300: '#a29cba',
          400: '#7d739a', 500: '#635880', 600: '#544a6b', 700: '#463e59',
          800: '#393348', 900: '#2e2939', 950: '#1f1b26',
        },
        violet: {
          50: '#f0edf3', 100: '#e4dee9', 200: '#cfc4d7', 300: '#b09cba',
          400: '#8f739a', 500: '#745880', 600: '#5b4a6b', 700: '#4c3e59',
          800: '#3d3348', 900: '#312939', 950: '#211b26',
        },
        amber: {
          50: '#f7f2e8', 100: '#f0e8d7', 200: '#e2d3b4', 300: '#cdb787',
          400: '#b2975c', 500: '#967a3f', 600: '#8a6635', 700: '#71542d',
          800: '#5b4526', 900: '#4a3820', 950: '#2f2314',
        },
        yellow: {
          50: '#f8f4e7', 100: '#f1ebd4', 200: '#e4d9af', 300: '#d0c081',
          400: '#b6a256', 500: '#9a853c', 600: '#8a7435', 700: '#705e2d',
          800: '#5a4c26', 900: '#493e20', 950: '#2e2714',
        },
        orange: {
          50: '#f8f1ea', 100: '#f1e5da', 200: '#e1cab7', 300: '#cba98b',
          400: '#b18660', 500: '#966943', 600: '#8a5c39', 700: '#704b30',
          800: '#5a3d28', 900: '#493221', 950: '#2e1f15',
        },
        red: {
          50: '#f8efed', 100: '#f1dfdb', 200: '#e2c1ba', 300: '#cd9c91',
          400: '#b37668', 500: '#9b5445', 600: '#8c3a2e', 700: '#733026',
          800: '#5c2820', 900: '#4b211b', 950: '#2f1410',
        },
        rose: {
          50: '#f8eef0', 100: '#f0dee2', 200: '#e0bfc7', 300: '#c998a5',
          400: '#ae7182', 500: '#935264', 600: '#7b4356', 700: '#663747',
          800: '#522d3a', 900: '#432630', 950: '#29171d',
        },
        // `pink` and `purple` were the two scales this remap missed, which is
        // why `bg-gradient-to-br from-pink-500 to-rose-400` on the partner card
        // and the dating-app header was Tailwind's real #ec4899 bleeding into a
        // muted mauve. The whole point of remapping is that a component
        // reaching for a candy colour cannot get one.
        pink: {
          50: '#f8eef1', 100: '#f0dee3', 200: '#e0bfc9', 300: '#c998a8',
          400: '#ae7186', 500: '#935268', 600: '#7b4359', 700: '#66374a',
          800: '#522d3c', 900: '#432632', 950: '#29171e',
        },
        purple: {
          50: '#f1eff4', 100: '#e4e0e9', 200: '#cac2d4', 300: '#aa9dba',
          400: '#8b7a9e', 500: '#715f85', 600: '#5b4a6b', 700: '#4b3d58',
          800: '#3d3247', 900: '#322a3a', 950: '#1e1923',
        },
        green: {
          50: '#edf2ee', 100: '#dde7e0', 200: '#bdcfc3', 300: '#95b09f',
          400: '#6b8f79', 500: '#4e7159', 600: '#3f6146', 700: '#34503a',
          800: '#2b4030', 900: '#243528', 950: '#152018',
        },
        emerald: {
          50: '#edf2ef', 100: '#dde7e1', 200: '#bdcfc5', 300: '#95b0a1',
          400: '#6b8f7c', 500: '#4e715d', 600: '#3f6149', 700: '#34503d',
          800: '#2b4032', 900: '#243529', 950: '#152019',
        },
        teal: {
          50: '#ecf1f2', 100: '#dbe5e7', 200: '#bacdd1', 300: '#91adb4',
          400: '#678c95', 500: '#4a6f79', 600: '#3f6470', 700: '#35525c',
          800: '#2c424a', 900: '#25373d', 950: '#152124',
        },
        // The neutrals every component reaches for, pulled warm so a grey card
        // does not read cold against paper.
        gray:  { 50: '#f7f5f1', 100: '#f0ede7', 200: '#e2ddd2', 300: '#d0c9b9',
                 400: '#a9a297', 500: '#7d766a', 600: '#615b52', 700: '#4a453e',
                 800: '#403b33', 900: '#2b2823', 950: '#1c1a16' },
        zinc:  { 50: '#f7f5f1', 100: '#f0ede7', 200: '#e2ddd2', 300: '#d0c9b9',
                 400: '#a9a297', 500: '#7d766a', 600: '#615b52', 700: '#4a453e',
                 800: '#403b33', 900: '#2b2823', 950: '#1c1a16' },
        stone: { 50: '#f7f5f1', 100: '#f0ede7', 200: '#e2ddd2', 300: '#d0c9b9',
                 400: '#a9a297', 500: '#7d766a', 600: '#615b52', 700: '#4a453e',
                 800: '#403b33', 900: '#2b2823', 950: '#1c1a16' },
        slate: { 50: '#f7f5f1', 100: '#f0ede7', 200: '#e2ddd2', 300: '#d0c9b9',
                 400: '#a9a297', 500: '#7d766a', 600: '#615b52', 700: '#4a453e',
                 800: '#403b33', 900: '#2b2823', 950: '#1c1a16' },
      },
      fontFamily: {
        // The prose. A transitional serif with a large x-height, because the
        // sentence is the product and it is read on a phone.
        prose: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
        // The chrome. Present, unobtrusive, never competing with the prose.
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // A dedicated size for event text: bigger than the UI around it, which
        // is the whole point of the hierarchy.
        prose: ['1.0625rem', { lineHeight: '1.65' }],
        'prose-lg': ['1.1875rem', { lineHeight: '1.6' }],
      },
      boxShadow: {
        // Paper sits on paper. It does not float.
        'card':    '0 1px 2px rgba(28,26,22,0.04), 0 1px 1px rgba(28,26,22,0.03)',
        'card-lg': '0 2px 8px rgba(28,26,22,0.06), 0 1px 2px rgba(28,26,22,0.04)',
      },
      borderRadius: {
        'xl': '10px',
        '2xl': '12px',
      },
    },
  },
  plugins: [],
}
