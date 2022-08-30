import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  VStack,
  Center,
  ScrollView,
  Stack,
  Divider,
  Heading,
} from 'native-base';
import { NativeBaseProvider } from 'native-base';
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
interface HeaderProps {
  //readonly content: string;
  readonly title?: string;
  readonly text1: string;
  readonly text2: string;
  readonly text3: string;
  readonly navi1: keyof RootStackParamList;
  readonly navi2: keyof RootStackParamList;
  readonly navi3: keyof RootStackParamList;
  readonly colour: number;
  readonly tone?: string;
}

export const MyBox: React.FC<HeaderProps> = (props) => {
  const navigation = globalNavigation()!;
  const tone = props.tone ?? 'info';

  return (
    <VStack space="2.5" mt="4" px="8">
      <Heading size="md">{props.title}</Heading>
      <Stack direction="row" mb="2.5" mt="1.5" space={3}>
        <Center
          size="24"
          bg={`${tone}.${props.colour}`}
          rounded="sm"
          _text={{
            color: 'warmGray.50',
            fontWeight: 'medium',
          }}
          shadow={'3'}
        >
          <Pressable onPress={() => navigation.navigate(props.navi1)}>
            <Text style={styles.label}>{props.text1}</Text>
          </Pressable>
        </Center>
        <Center
          bg={`${tone}.${props.colour + 100}`}
          size="24"
          rounded="sm"
          _text={{
            color: 'warmGray.50',
            fontWeight: 'medium',
          }}
          shadow={'3'}
        >
          <Pressable onPress={() => navigation.navigate(props.navi2)}>
            <Text style={styles.label}>{props.text2}</Text>
          </Pressable>
        </Center>
        <Center
          size="24"
          bg={`${tone}.${props.colour + 200}`}
          rounded="sm"
          _text={{
            color: 'warmGray.50',
            fontWeight: 'medium',
          }}
          shadow={'3'}
        >
          <Pressable onPress={() => navigation.navigate(props.navi3)}>
            <Text style={styles.label}>{props.text3}</Text>
          </Pressable>
        </Center>
      </Stack>
      <Divider />
    </VStack>
  );
};
