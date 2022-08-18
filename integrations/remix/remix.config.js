/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: ['@tailwind-compose/integration-components', 'tailwind-compose'],
};
