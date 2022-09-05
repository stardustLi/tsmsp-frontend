import { Input, Stack } from 'native-base';
import React, { Dispatch } from 'react';
import { StyleSheet } from 'react-native';

import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  input: baseStyle.input,
});

interface InputProps {
  readonly text: string;
  readonly setText: Dispatch<string>;
  readonly placeholder: string;
}

interface TextInputRowProps {
  readonly width: number;
  readonly inputs: InputProps[];
}

export const TextInputRow: React.FC<TextInputRowProps> = (props) => {
  return (
    <Stack direction="row" mb="2.5" mt="1.5" space={3}>
      {props.inputs.map(({ text, setText, placeholder }, idx) => (
        <Input
          key={idx}
          style={styles.input}
          defaultValue=""
          placeholder={placeholder}
          value={text}
          onChangeText={setText}
          width={props.width}
        />
      ))}
    </Stack>
  );
};
