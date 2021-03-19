module.exports = {
  corePlugins: {
  },
  purge: [],
  darkMode: false,
  theme: {},
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      ringWidth: ['focus-visible'],
      ringColor: ['hover', 'active', 'focus', 'focus-visible'],
      ringOffsetWidth: ['responsive', 'focus-visible', 'focus'],
      textColor: ['disabled'],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
