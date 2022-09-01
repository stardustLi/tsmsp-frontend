import { FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';
import { InterfaceInputProps } from 'native-base/lib/typescript/components/primitives/Input/types';
import React, { Dispatch } from 'react';
import { StyleSheet } from 'react-native';

import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  input: baseStyle.input,
  label: baseStyle.label,
});

interface TextInputProps {
  readonly text: string;
  readonly setText: Dispatch<string>;
  readonly label: string;
  readonly type: InterfaceInputProps['type'];
  readonly reminder?: string;
  readonly warn?: boolean;
  readonly width?: string;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <FormControl isRequired>
      <Stack mx="4">
        <FormControl.Label style={styles.label}>
          {props.label}
        </FormControl.Label>
        <Input
          style={styles.input}
          type={props.type}
          defaultValue=""
          placeholder={props.label}
          value={props.text}
          onChangeText={props.setText}
        />
        <FormControl.HelperText>
          {/* Must be atleast 6 characters. */}
          {props.reminder}
        </FormControl.HelperText>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Atleast 6 characters are required.
        </FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};
