import * as Components from '@tailwind-compose/integration-components';
import * as React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <Components.ClassnamesComponents />
      <Components.ComposeComponents />
    </React.Fragment>
  );
}
