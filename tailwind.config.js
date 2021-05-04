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
      },
      fontSize: {
        error: ['9rem', '1'],
      },
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
      opacity: ['hover', 'focus'],
      fill: ['hover', 'group-hover', 'group-focus', 'focus'],
      stroke: ['hover', 'group-hover', 'group-focus', 'focus'],
      width: ["hover"]
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-scroll-snap'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-pseudo-elements'),
    require('@tailwindcss/line-clamp'),
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
