
module.exports = {
  corePlugins: {
  },
  purge: [
    './layouts/**/*.htm',
    './pages/**/*.htm',
    './partials/**/*.htm',
  ],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateColumns: {
        'full': '100%',
        },
      gridTemplateRows: {
        'auto-fr-auto': 'auto 1fr auto',
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-scroll-snap'),
  ],
}
