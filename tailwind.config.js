/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Light theme - BitLife-inspired
        'natalis-bg':      '#f2f2f7',
        'natalis-surface': '#ffffff',
        'natalis-border':  '#e5e5ea',
        'natalis-muted':   '#8e8e93',
        'natalis-text':    '#1c1c1e',
        'natalis-dim':     '#3a3a3c',
        // Accent colors
        'bit-blue':    '#007aff',
        'bit-green':   '#34c759',
        'bit-red':     '#ff3b30',
        'bit-orange':  '#ff9500',
        'bit-yellow':  '#ffcc00',
        'bit-purple':  '#af52de',
        'bit-teal':    '#5ac8fa',
        'bit-pink':    '#ff2d55',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.08)',
        'card-lg': '0 4px 24px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
}
