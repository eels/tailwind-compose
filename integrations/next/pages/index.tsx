import * as Composed from '@tailwind-compose/integration-components';
import { Fragment, useState } from 'react';

export default function Home() {
  const [strBtnEnabled, setStrBtnEnabled] = useState(false);
  const [arrBtnEnabled, setArrBtnEnabled] = useState(false);

  const handleSetStrBtnEnabled = () => {
    setStrBtnEnabled((state) => !state);
  };

  const handleSetArrBtnEnabled = () => {
    setArrBtnEnabled((state) => !state);
  };

  return (
    <Fragment>
      {/* Basic Component */}
      <Composed.BasicHeadline data-cy='basic-headline'>
        Basic Component Headline
      </Composed.BasicHeadline>

      {/* Basic Component via property */}
      <Composed.BasicHeadlineProperty data-cy='basic-headline-property'>
        Basic Component via property Headline
      </Composed.BasicHeadlineProperty>

      {/* Extended Component */}
      <Composed.ExtendedHeadline data-cy='extended-headline'>
        Extended Component Headline
      </Composed.ExtendedHeadline>

      {/* Basic Component w/ attrs */}
      <Composed.BasicEmailField data-cy='basic-email-field' />

      {/* Basic Component w/ attrs via property */}
      <Composed.BasicEmailFieldProperty data-cy='basic-email-field-property' />

      {/* Basic Component w/ as string prop */}
      <Composed.BasicButton data-cy='basic-button-as-string' as='div'>
        Basic Component w/ as string prop
      </Composed.BasicButton>

      {/* Basic Component w/ as component prop */}
      <Composed.BasicButton data-cy='basic-button-as-component' as={Composed.BasicHeadline}>
        Basic Component w/ as component prop
      </Composed.BasicButton>

      {/* Extended Component w/ attrs */}
      <Composed.ExtendedButton data-cy='extended-button'>
        Extended Component w/ attrs Button
      </Composed.ExtendedButton>

      {/* Conditional Class as string Component */}
      <Composed.CondButtonString
        data-cy='conditional-button-string'
        isActive={strBtnEnabled}
        onClick={handleSetStrBtnEnabled}
      >
        Conditional Class as string Component Button
      </Composed.CondButtonString>

      {/* Conditional Class as array Component */}
      <Composed.CondButtonArray
        data-cy='conditional-button-array'
        isActive={arrBtnEnabled}
        onClick={handleSetArrBtnEnabled}
      >
        Conditional Class as array Component Button
      </Composed.CondButtonArray>

      {/* Basic ClassNames */}
      <h1 className={Composed.BasicClassNamesHeadline()} data-cy='basic-classnames-headline'>
        Basic ClassNames Headline
      </h1>

      {/* Conditional ClassNames as string */}
      <button
        data-cy='conditional-classnames-button-string'
        className={Composed.CondClassNamesButtonString({ isActive: strBtnEnabled })}
        onClick={handleSetStrBtnEnabled}
      >
        Conditional ClassNames as string Component Button
      </button>

      {/* Conditional ClassNames as array */}
      <button
        data-cy='conditional-classnames-button-array'
        className={Composed.CondClassNamesButtonArray({ isActive: arrBtnEnabled })}
        onClick={handleSetArrBtnEnabled}
      >
        Conditional ClassNames as array Component Button
      </button>
    </Fragment>
  );
}