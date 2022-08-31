import {
  Box,
  FormControl,
  Input,
  NativeBaseProvider,
  Stack,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import { InterfaceInputProps } from 'native-base/lib/typescript/components/primitives/Input/types';
import React, { Dispatch } from 'react';
import { StyleSheet } from 'react-native';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});
interface TextInProps {
  readonly text: string;
  readonly setText: Dispatch<string>;
  readonly text2: string;
  readonly type: InterfaceInputProps['type'];
  readonly reminder?: string;
  readonly warn?: boolean;
  readonly width?: string;
}

export const TextIn: React.FC<TextInProps> = (props) => {
  // const warn: boolean = props.warn ?? true;
  const width = props.width ?? 250;

  return (
    <NativeBaseProvider>
      <VStack space="2.5" mt="1" px="8"></VStack>
      <Box alignItems="center">
        <Box w="100%" maxWidth={width} minWidth={width}>
          <FormControl isRequired>
            <Stack mx="4">
              <FormControl.Label style={styles.label}>
                {props.text2}
              </FormControl.Label>
              <Input
                style={styles.input}
                type={props.type}
                defaultValue=""
                placeholder={props.text2}
                value={props.text}
                onChangeText={props.setText}
              />

              <FormControl.HelperText>
                {/* Must be atleast 6 characters. */}
                {props.reminder}
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Atleast 6 characters are required.
              </FormControl.ErrorMessage>
            </Stack>
          </FormControl>
        </Box>
      </Box>
      <VStack space="2.5" mt="4" px="8"></VStack>
    </NativeBaseProvider>
  );
};

{
  /* <Text style={styles.label}>用户名</Text>
<TextInput
  placeholder="用户名"
  style={styles.input}
  value={userName}
  onChangeText={(newText) => setUserName(newText)}
/> */
}
