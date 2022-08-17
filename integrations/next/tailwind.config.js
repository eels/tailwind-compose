/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './{components,pages}/**/*.{jsx,tsx}',
    '../../node_modules/@tailwind-compose/integration-components/components/**/*.{jsx,tsx}',
  ],

  plugins: [],

  theme: {
    extend: {},
  },
};
