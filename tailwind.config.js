module.exports = {
  content: ["./src/**/*.{js,jsx}", "./src/**/**/*.{js,jsx}", "./src/**/**/**/*.{js,jsx}"],
  theme: {
    screens: {
      'xl': { 'max': '1600px' },
      'lg': { 'max': '1199px' },
      'md': { 'max': '991px' },
      'sm': { 'max': '767px' },
      'xs': { 'max': '575px' },
      'xxs': { 'max': '480px' },
      'mxl': { 'raw': '(min-width: 1921px)' },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Poppins', 'sans-serif'],
    },
    fontSize: {
      base: ['15px', '30px'],
      xxs: ['11px', '14px'],
      xs: ['12px', '16px'],
      sm: ['13px', '22px'],
      md: ['14px', '20px'],
      xmd: ['16px', '28px'],
      lg: ['18px', '22px'],
      xlg: ['20px', '28px'],
      xbig: ['230px', '200px']
    },
    extend: {
      textUnderlineOffset: {
        2: '3px',
        4: '4px',
        8: '8px'
      },
      colors: {
        /* Enfono Brand Colors — matching logo blue */
        'enfono-blue': '#010ED0',
        'enfono-blue-dark': '#000B8C',
        'enfono-blue-light': '#2B3DE8',
        'enfono-blue-pale': '#E8EBFF',
        'enfono-amber': '#F59E0B',
        'enfono-amber-light': '#FCD34D',
        'enfono-dark': '#020820',
        'enfono-mid': '#0F1B4D',
        'enfono-light': '#F5F7FF',
        'enfono-text': '#0F172A',
        /* Kept from template for compatibility */
        fastblue: '#1B3A5C',
        darkgray: '#232323',
        darkslateblue: '#1f232c',
        lightgray: '#f7f7f7',
        spanishgray: '#939393',
        mediumgray: '#e4e4e4',
        darkpurple2: '#241526',
        coolgray: '#d6d5d5',
        neonorange: '#ff7a56',
        slateblue: '#8890a4',
        error: 'red'
      }
    },
  },
  corePlugin: {
    order: false
  },
  plugins: [],
}