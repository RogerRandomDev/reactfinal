/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  variants: {
    extend: {
      textDecoration: ['group-hover', 'group-focus'],
    },
  },
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
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
