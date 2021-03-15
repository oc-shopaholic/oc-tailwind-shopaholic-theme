module.exports = {
  corePlugins: {
  },
  purge: [],
  darkMode: false,
  theme: {},
  variants: {
    extend: {
      margin: ['last'],
      textColor: ['active'],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
