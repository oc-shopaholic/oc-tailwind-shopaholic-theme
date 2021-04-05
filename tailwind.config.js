
module.exports = {
  corePlugins: {
  },
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateColumns: {
        'full': '100%',
        },
      gridTemplateRows: {
        'auto-fr-auto': 'auto 1fr auto',
      },
      outline: {
        blue: ['1px dashed #1E40AF', '1px'],
      }
    }
  },
  variants: {
    extend: {
      textColor: ['active', 'focus-visible'],
      outline: ['focus-visible'],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
