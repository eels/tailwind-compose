/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    '../../node_modules/@tailwind-compose/integration-components/src/**/*.{ts,tsx}',
  ],

  plugins: [],

  theme: {
    extend: {},
  },
};
