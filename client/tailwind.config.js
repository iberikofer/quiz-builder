/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        md: '769px',
      },
      colors: {
        mint: {
          50: '#f0fdf9',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0fa37f', // primary brand mint
          700: '#0d8567',
          800: '#0c6b54',
          900: '#0d5745',
          950: '#043228',
        },
      },
    },
  },
  plugins: [],
};
