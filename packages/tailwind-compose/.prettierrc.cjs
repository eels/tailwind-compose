module.exports = {
  ...require('@tailwind-compose/prettier-config/lib/prettierrc.json'),
  overrides: [
    {
      files: ['./types/tailwind-compose.d.ts'],
      options: {
        printWidth: 999,
      },
    },
  ],
};
