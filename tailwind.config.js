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
        },
      gridTemplateRows: {
        'auto-fr-auto': 'auto 1fr auto',
      }
    }
  },
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
    require('tailwindcss-pseudo-elements'),
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
