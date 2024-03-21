const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './layouts/**/*.htm',
    './pages/**/*.htm',
    './partials/**/*.htm',
    './partials/**/*.js',
  ],
  theme: {
    extend: {
      transitionDuration: {
        '0': '0ms',
      },
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
        '45': '45%',
        '65': '65%',
        '75': '75%',
        'info-icon': '12.5rem',
      },
      backgroundImage: {
        'check': "url('/themes/lovata-tailwind-shopaholic/assets/images/check.svg')",
        'check-black': "url('/themes/lovata-tailwind-shopaholic/assets/images/check-black.svg')",
        'feedback': "url('/themes/lovata-tailwind-shopaholic/assets/images/union.svg')",
      },
      fontSize: {
        error: ['9rem', '1'],
      },
      maxWidth: {
        'screen': '100vw',
        'screen-3xl': '1920px',
        225: '900px',
      },
      padding: {
        54: '13.5rem',
        57: '14.25rem',
      },
      margin: {
        '-screen-1/2': '-50vw',
      },
      maxHeight: {
        160: '40rem',
      },
      minWidth: {
        18: '72px'
      },
      width: {
        90: '360px',
        174: '696px',
        23: '92px',
        225: '900px',
      },
      height: {
        'screen-3xl': '1920px',
        225: '900px',
        23: '92px',
        131: '524px'
      },
      spacing: {
        2.25: '9px',
        1.75: '7px',
        0.25: '1px',
      },
      screens: {
        'ml': '840px',
      },
      colors: {
        outline: {
          variant: "var(--outline-variant, #E5E7EB)", // g-200
          DEFAULT: "var(--outline, #9CA3AF)", // g-400
        },
        "on-surface": {
          DEFAULT: "var(--on-surface, #111827)", // g-900
        },
        primary: {
          container: "var(--primary-container, #bfdbfe)", // b-200
          hover: "var(--primary-hover, #1D4ED8)", // b-700
          focus: "var(--primary-focus, #1e3a8a)", // b-900
          DEFAULT: "var(--primary, #1E40AF)", // b-800
        }
      }
    }
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      textColor: ['active', 'focus-visible', 'visited'],
      outline: ['focus-visible'],
      backgroundColor: ['group-focus', 'active', 'focus-visible', 'disabled'],
      ringWidth: ['focus-visible'],
      ringColor: ['hover', 'active', 'focus', 'focus-visible'],
      ringOffsetWidth: ['responsive', 'focus-visible', 'focus'],
      opacity: ['hover', 'focus'],
      fill: ['hover', 'group-hover', 'group-focus', 'focus'],
      stroke: ['hover', 'group-hover', 'group-focus', 'focus'],
      width: ['hover'],
      borderWidth: ['first', 'last'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-pseudo-elements'),
    require('tailwindcss-content-visibility'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.separator': {
          content: 'url(/themes/lovata-tailwind-shopaholic/assets/images/separator.svg)',
        }
      };
      addUtilities(newUtilities, ['before'])
    }),
    plugin(({ addVariant, e }) => {
      addVariant('backdrop', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.${e(`backdrop${separator}${className}`)}::backdrop`)
      })
    }),
  ]
};
