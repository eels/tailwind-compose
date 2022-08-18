import * as Components from '@tailwind-compose/integration-components';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <Components.ClassnamesComponents />
      <Components.ComposeComponents />
    </Fragment>
  );
}
