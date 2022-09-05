import { Box, Center, Select as BaseSelect } from 'native-base';
import React, { Dispatch } from 'react';

export interface SelectItem {
  readonly label: string;
  readonly value: string;
}

interface SelectProps {
  readonly value: string;
  readonly setValue: Dispatch<string>;
  readonly placeholder: string;
  readonly items: SelectItem[];
}

export const Select: React.FC<SelectProps> = (props) => {
  return (
    <Center>
      <Box maxW="300">
        <BaseSelect
          selectedValue={props.value}
          minWidth="200"
          placeholder={props.placeholder}
          mt={1}
          onValueChange={props.setValue}
        >
          {props.items.map(({ label, value }) => (
            <BaseSelect.Item key={value} label={label} value={value} />
          ))}
        </BaseSelect>
      </Box>
    </Center>
  );
};
