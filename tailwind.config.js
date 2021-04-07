const plugin = require('tailwindcss/plugin')

module.exports = {
  corePlugins: {
  },
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateColumns: {
        'full': '100%',
        'social': 'repeat(auto-fill, 40px)',
        'payments': 'repeat(auto-fit, 56px)',
        },
      gridTemplateRows: {
        'auto-fr-auto': 'auto 1fr auto',
      },
      outline: {
        blue: ['1px dashed #1E40AF', '1px'],
      },
      backgroundSize: {
        '65': '65%',
      }
    }
  },
  variants: {
    extend: {
      margin: ['first'],
      textColor: ['active'],
      outline: ['focus-visible'],
      backgroundColor: ['group-focus', 'active', 'focus-visible']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-pseudo-elements'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.separator': {
          content: 'url(/themes/lovata-tailwind-shopaholic/assets/images/separator.svg)',
        }
      }
      addUtilities(newUtilities, ['before'])
    }),
  ],
}
