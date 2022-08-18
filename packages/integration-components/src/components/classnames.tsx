import * as Composed from '../styles';
import { Fragment, useState } from 'react';

export function ClassnamesComponents() {
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
