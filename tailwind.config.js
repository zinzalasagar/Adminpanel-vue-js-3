/* In your tailwind.config.js */

// const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // extend: {
    //   fontFamily: {
    //     'body': ['Nunito Sans'],
    //     'sans': ['nunito', ...defaultTheme.fontFamily.sans],
    //     'serif': [...defaultTheme.fontFamily.serif],
    //     'mono': [...defaultTheme.fontFamily.mono]
    //   },
    // },  
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}