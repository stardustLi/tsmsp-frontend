import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  VStack,
  Center,
  ScrollView,
  Stack,
  Divider,
  Heading,
} from 'native-base';
import * as baseStyle from 'utils/styles';
import { globalNavigation } from 'utils/navigation';
import { RootStackParamList } from '../../App';
import { Header } from './Header';
const styles = StyleSheet.create({
  container: baseStyle.container,
  //button: baseStyle.button,
  input: baseStyle.input,
  label: baseStyle.label2,
});
interface TextInProps {
    readonly text: string;
    readonly setText: Dispatch<SetStateAction<string>>;
    readonly text2: string;
}

export const TextIn: React.FC<TextInProps> = (props) => {
  const navigation = globalNavigation()!;
  //const tone = props.tone ?? 'info';


  return (
<>
    <Text style={styles.label}>密码</Text>
    <TextInput
        placeholder={props.text2}
        style={styles.input}
        value={props.text}
        onChangeText={(newText: string) => props.setText(newText)}
        secureTextEntry={true}
    />
</>
  );
};
