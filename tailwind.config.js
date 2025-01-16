/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#7353EA',
        'sub-color': '#7353EA14',
        'dark-gray': '#ABABAB',
        'light-gray': '#D9D9D9',
        'main-black': '#212529',
        'board-dark-gray': '#333333',
        'board-light-gray': '#F3F4F6',
      },
      fontSize: {
        'size-title': ['1.5rem', '2rem'],
        'size-body': ['1rem', '1.5rem'],
        'size-subbody': ['0.75rem', '1rem'],
      },
    },
  },
  plugins: [],
}
