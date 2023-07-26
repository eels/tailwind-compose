import * as Composed from '../styles';
import * as React from 'react';

export function ClassnamesComponents() {
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
      {/* Basic ClassNames */}
      <h1 className={Composed.BasicClassNamesHeadline()} data-cy='basic-classnames-headline'>
        Basic ClassNames Headline
      </h1>

      {/* Conditional ClassNames as string */}
      <button
        className={Composed.CondClassNamesButtonString({ $isActive: strBtnEnabled })}
        data-cy='conditional-classnames-button-string'
        onClick={handleSetStrBtnEnabled}
      >
        Conditional ClassNames as string Component Button
      </button>

      {/* Conditional ClassNames as array */}
      <button
        className={Composed.CondClassNamesButtonArray({ $isActive: arrBtnEnabled })}
        data-cy='conditional-classnames-button-array'
        onClick={handleSetArrBtnEnabled}
      >
        Conditional ClassNames as array Component Button
      </button>
    </React.Fragment>
  );
}
