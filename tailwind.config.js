const plugin = require('tailwindcss/plugin')

module.exports = {
  corePlugins: {
  },
  content: [
    './layouts/**/*.htm',
    './pages/**/*.htm',
    './partials/**/*.htm',
  ],
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
        65: '65%',
        'info-icon': '12.5rem',
      },
      fontSize: {
        error: ['9rem', '1'],
      },
      padding: {
        54: '13.5rem',
        57: '14.25rem',
      },
      height: {
        23: '92px',
        131: '524px'
      },
      maxHeight: {
        160: '40rem',
      },
      width: {
        23: '92px',
        174: '696px',
        225: '900px',
      },
      maxWidth: {
        'screen-3xl': '1920px',
        225: '900px',
      },
      spacing: {
        2.25: '9px',
        1.75: '7px',
        0.25: '1px',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
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
    plugin(({ addVariant, e }) => {
      addVariant('backdrop', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.${e(`backdrop${separator}${className}`)}::backdrop`)
      })
    }),
  ]
}
