import styles from './styles/global.css';
import { Links, LiveReload, Meta, Outlet, Scripts } from '@remix-run/react';

export function links() {
  return [{ href: styles, rel: 'stylesheet' }];
}

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
