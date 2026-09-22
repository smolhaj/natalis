import js from '@eslint/js'
import globals from 'globals'

// The project had no linter, and two of the defects found in the September 2026
// pass were exactly what a linter reports for free:
//
//   - `events_canada.js` computed `isQuebec` from an OR that made it true for
//     every Canadian, then never used the variable. `no-unused-vars`.
//   - a re-export left `MONSOON_COUNTRIES` unbound inside its own module, which
//     killed 180 of 200 simulated lives while all 224 unit tests passed.
//     `no-undef`.
//
// So this config is deliberately narrow: the rules that catch a real bug, at
// error level, and nothing stylistic. A lint run that reports 4,000 formatting
// opinions in an 8,000-event corpus is a lint run nobody will read, and the
// corpus is prose — its line lengths and quote styles are not the linter's
// business.
export default [
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      ...js.configs.recommended.rules,

      // ── The rules that catch real defects ────────────────────────────────
      'no-undef': 'error',

      // Dead code, not a defect — and there are ~140 of them inherited, mostly
      // unused React components and useState pairs nothing reads. At 'error'
      // the gate would be permanently red and nobody would read it, so it
      // reports at 'warn': the count is visible, it is tracked below, and a new
      // one shows up in the diff of the pull request that introduced it.
      // Unused *imports* were removed outright; these are unused locals.
      'no-unused-vars': ['warn', {
        args: 'none',                 // `(G) => ...` guards often ignore G
        varsIgnorePattern: '^_',
        caughtErrors: 'none',         // `catch {}` is used deliberately in the sim harness
      }],
      'no-dupe-keys': 'error',        // two `colors:` keys in one object silently
                                      // wiped every natalis-* token during the
                                      // theme rewrite; this is that rule.
      'no-dupe-args': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-case': 'error',
      'no-unreachable': 'error',      // an unguarded `return` mid-function makes
                                      // everything after it dead content
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-self-compare': 'error',
      'no-unsafe-negation': 'error',
      'no-sparse-arrays': 'error',    // a trailing `,,` in an 8,000-entry array
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'no-cond-assign': 'error',
      'no-async-promise-executor': 'error',
      'require-atomic-updates': 'off',

      // ── Deliberately off ────────────────────────────────────────────────
      // The corpus is 10MB of authored prose in string literals. Style rules
      // over it produce noise, not signal.
      'no-irregular-whitespace': 'off',
      'no-control-regex': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      // 67 instances, all of them an escaped apostrophe inside a template
      // literal in authored prose, where the escape is harmless and arguably
      // clearer next to the hundreds of single-quoted strings around it.
      'no-useless-escape': 'off',
    },
  },

  // Scripts and tests run in node and use the console on purpose.
  {
    files: ['scripts/**/*.js', 'tests/**/*.js', '*.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
]
