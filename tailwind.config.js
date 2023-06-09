const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        l: '0px 4px 24px rgba(37, 83, 248, 0.05)',
      },
    },
    screens: {
      lg: '1054px',
    },
    backgroundImage: {
      'arrow-select': "url('/dropdown-vector.svg')",
      'arrow-select-green': "url('/angle-down-green.svg')",
    },
    borderRadius: {
      full: '100%',
      xxl: '30px',
      xl: '20px',
      xll: '14px',
      l: '12px',
      s: '10px',
      ss: '8px',
    },
    fontFamily: {
      body: ['var(--font-pt-root)', ...fontFamily.sans],
      bodyLight: ['var(--font-pt-light)', ...fontFamily.sans],
      'pt-light': ['Pt Light', 'Arial', 'Helvetica', 'sans-serif'],
    },
    fontSize: {
      'h-xl-d': '48px',
      'h-xl-m': '36px',
      'h-l-d': '39px',
      'h-l-m': '32px',
      'h-m-d': '31px',
      'h-m-m': '26px',
      'h-s-d': ['25px', '100%'],
      'h-s-m': '22px',
      xl: '20px',
      l: '18px',
      m: '15px',
      s: '14px',
      'a-xl': '20px',
      'a-l': '18px',
      'a-m': ['16px', '140%'],
      'a-s': '14px',
      'a-ss': '13px',
      'a-sss': '9px',
    },
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#ffffff',
      primary: '#112132',
      secondary: '#677A8E',
      tetriary: '#AEBAC7',
      disabled: '#DCE2E7',
      green: '#1DA977',
      error: '#DC5252',
      attention: '#E0A041',
      link: '#77ABE7',
      positive: '#6DC5A5',
      accent1: '#52786A',
      accent1Hover: '#485F56',
      accent2: '#D9C4AC',
      bgPrimary: '#F3F6FA',
      bgSecondary: '#ECF0F3',
      bgTetriary: '#E3E9EE',
      borderPrimary: '#E6EBEF',
      borderError: '#DC5252',
      borderAttention: '#E0A041',
      borderPos: '#6DC5A5',
      legacyGraphit: '#626977',
      legacyBrown: '#DBDBDB',
      legacyBlack: '#1F283A',
      peach: '#F7F3EE',
      cream: '#F3EDE6',
      mint: '#EEF2F0'
    },
  },
  plugins: [],
};
