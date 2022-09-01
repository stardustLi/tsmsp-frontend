import React, { Dispatch, SetStateAction } from 'react';
import { Checkbox as BaseCheckbox } from 'native-base';

interface CheckBoxProps {
  readonly checked: boolean;
  readonly message: string;
  readonly handleChange: Dispatch<SetStateAction<boolean>>;
}

export const Checkbox: React.FC<CheckBoxProps> = (props) => {
  return (
    <BaseCheckbox
      value="one"
      isChecked={props.checked}
      onChange={props.handleChange}
    >
      {props.message}
    </BaseCheckbox>
  );
};
