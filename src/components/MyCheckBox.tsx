import React, { Dispatch, SetStateAction } from 'react';
import { Checkbox } from 'native-base';

interface MyCheckBoxProps {
  readonly checked: boolean;
  readonly handleChange: Dispatch<SetStateAction<boolean>>;
  readonly message: string;
}

export const MyCheckBox: React.FC<MyCheckBoxProps> = (props) => {
  return (
    <>
      <Checkbox
        value="one"
        isChecked={props.checked}
        onChange={props.handleChange}
      >
        {props.message}
      </Checkbox>

      {/* <Checkbox value="two" isChecked={props.checked[1]} onChange={props.handleChange[1]}>
        承诺无感冒、头痛、发烧、不想写代码等症状
      </Checkbox> */}
    </>
  );
};
