/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        right: 'right',
      },
      screens: {
        '3xl': '1800px',
      },
    },
  },
  plugins: [],
};
