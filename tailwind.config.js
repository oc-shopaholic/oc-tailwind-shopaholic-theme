module.exports = {
  corePlugins: {
  },
  purge: [
    './layouts/**/*.htm',
    './pages/**/*.htm',
    './partials/**/*.htm',
  ],
  darkMode: false,
  theme: {},
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-scroll-snap'),
  ],
}
