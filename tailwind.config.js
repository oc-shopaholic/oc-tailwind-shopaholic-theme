const plugin = require('tailwindcss/plugin')

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
      margin: ['first', "last"],
      textColor: ['active', 'focus-visible', 'visited'],
      outline: ['focus-visible'],
      backgroundColor: ['group-focus', 'active', 'focus-visible', 'disabled'],
      ringWidth: ['focus-visible'],
      ringColor: ['hover', 'active', 'focus', 'focus-visible'],
      ringOffsetWidth: ['responsive', 'focus-visible', 'focus'],
      opacity: ['hover', 'focus']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-scroll-snap'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-pseudo-elements'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.separator': {
          content: 'url(/themes/lovata-tailwind-shopaholic/assets/images/separator.svg)',
        }
      }
      addUtilities(newUtilities, ['before'])
    }),
  ]
}
