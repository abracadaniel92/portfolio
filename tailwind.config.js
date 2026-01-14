/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf9',
          100: '#d1faee',
          200: '#a7f3df',
          300: '#6ee7cd',
          400: '#34d3b6',
          500: '#14b8a6',  /* primary teal */
          600: '#0fa495',
          700: '#0b7e73',
          800: '#0a5c56',
          900: '#083f3c'
        }
      },
      boxShadow: {
        glow: '0 0 0 3px rgba(20,184,166,0.25)'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}
