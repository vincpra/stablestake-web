const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

/* Additional plugins */

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-20': {
      transform: 'rotateY(20deg)',
    },
    '.rotate-y-40': {
      transform: 'rotateY(40deg)',
    },
    '.rotate-y-45': {
      transform: 'rotateY(45deg)',
    },
    '.rotate-y-60': {
      transform: 'rotateY(60deg)',
    },
    '.rotate-y-90': {
      transform: 'rotateY(90deg)',
    },
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
  })
})

/* Theme Customization and Variables */

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px'
    },
    container: {
      screens: {
        tablet: '100%',
        laptop: '100%',
        desktop: '1280px'
      },
      padding: {
        DEFAULT: '1.25rem',
        desktop: '0rem'
      }
    },
    colors: {
      black: {
        DEFAULT: '#000000'
      },
      blue: {
        DEFAULT: '#1F5AE2',
        light: '#8BCBF0',
        dark: '#073545',
        darker: '#374b52',
        main1: '#041920', // Gradient main section 1
        main2: '#06303d', // Gradient main section 2
        main3: '#082c3a',
        main4: '#083e4e',
        marine: '#050022',
        twitter: '#1DA1F2'
      },
      cyan: {
        DEFAULT: '#06AFE5',
        light: '#36D3D3',
      },
      purple: {
        discord: '#7289DA'
      },
      gray: {
        DEFAULT: '#4D6481',
        light: '#697478',
        lighter: '#f2f2f2',
        mid: '#9EAFC9',
        swap: '#F7F7FA',
        swapdark: '#E1DFF3',
        swapconnect: '#DDDBF0',
        swapcircle: '#F7F8FA'
      },
      white: colors.white,
      red: {
        error: '#F53939'
      },
      green: {
        DEFAULT: '#4f9b20',
        dark: '#3f7c1a'
      }
    },
    backgroundPosition: {
      center: 'center',
      top: 'top',
      bottom: 'bottom'
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '100%': '100%'
    },
    extend: {
      fontFamily: {
        redhatdisplay: ['Red Hat Display', ...defaultTheme.fontFamily.sans]
      },
      opacity: {
        12: '0.12',
        36: '0.36',
        48: '0.48',
        98: '0.98'
      },
      spacing: {
        5.5: '1.375rem',
        22: '5.5rem'
      },
    },
    minHeight: {
      '40%': '40%'
    }
  },
  plugins: [rotateY]
}
