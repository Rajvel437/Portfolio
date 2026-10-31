/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        surface2: token('surface-2'),
        line: token('line'),
        fg: token('fg'),
        muted: token('muted'),
        amber: token('amber'),
        teal: token('teal'),
        rose: token('rose'),
      },
      fontFamily: {
        display: ['"Schibsted Grotesk"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        sans: ['"IBM Plex Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
