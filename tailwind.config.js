/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'natalis-bg': '#0a0a0b',
        'natalis-surface': '#141416',
        'natalis-border': '#1e1e22',
        'natalis-muted': '#3a3a42',
        'natalis-text': '#e8e8ec',
        'natalis-dim': '#8888a0',
      },
    },
  },
  plugins: [],
}
