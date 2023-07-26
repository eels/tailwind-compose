import * as Composed from '../styles';
import * as React from 'react';

export function ComposeComponents() {
  const [strBtnEnabled, setStrBtnEnabled] = React.useState(false);
  const [arrBtnEnabled, setArrBtnEnabled] = React.useState(false);

  const handleSetStrBtnEnabled = () => {
    setStrBtnEnabled((state) => !state);
  };

  const handleSetArrBtnEnabled = () => {
    setArrBtnEnabled((state) => !state);
  };

  return (
    <React.Fragment>
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
      <Composed.BasicButton as='div' data-cy='basic-button-as-string'>
        Basic Component w/ as string prop
      </Composed.BasicButton>

      {/* Basic Component w/ as component prop */}
      <Composed.BasicButton as={Composed.BasicHeadline} data-cy='basic-button-as-component'>
        Basic Component w/ as component prop
      </Composed.BasicButton>

      {/* Extended Component w/ attrs */}
      <Composed.ExtendedButton data-cy='extended-button'>
        Extended Component w/ attrs Button
      </Composed.ExtendedButton>

      {/* Conditional Class as string Component */}
      <Composed.CondButtonString
        $isActive={strBtnEnabled}
        data-cy='conditional-button-string'
        onClick={handleSetStrBtnEnabled}
      >
        Conditional Class as string Component Button
      </Composed.CondButtonString>

      {/* Conditional Class as array Component */}
      <Composed.CondButtonArray
        $isActive={arrBtnEnabled}
        data-cy='conditional-button-array'
        onClick={handleSetArrBtnEnabled}
      >
        Conditional Class as array Component Button
      </Composed.CondButtonArray>
    </React.Fragment>
  );
}
