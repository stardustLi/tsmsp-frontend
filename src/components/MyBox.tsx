import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  VStack,
  Center,
  ScrollView,
  Stack,
  Divider,
} from 'native-base';
import { globalNavigation } from 'utils/navigation';
interface HeaderProps {
  //readonly content: string;
  readonly text1: String;
  readonly text2: String;
  readonly text3: String;
  readonly colour: number;
}

export const MyBox: React.FC<HeaderProps> = (props) => {
  const navigation = globalNavigation()!;

  return (
    <ScrollView>
      <VStack space="2.5" mt="4" px="8">
        {/* <Heading size="md">header</Heading> */}
        <Stack direction="row" mb="2.5" mt="1.5" space={3}>
          <Center
            size="24"
            bg={`primary.${props.colour}`}
            rounded="sm"
            _text={{
              color: 'warmGray.50',
              fontWeight: 'medium',
            }}
            shadow={'3'}
          >
            <Text>{props.text1}</Text>
          </Center>
          <Center
            bg={`primary.${props.colour+100}`}
            size="24"
            rounded="sm"
            _text={{
              color: 'warmGray.50',
              fontWeight: 'medium',
            }}
            shadow={'3'}
          >
            <Text>{props.text2}</Text>
          </Center>
          <Center
            size="24"
            bg={`primary.${props.colour+200}`}
            rounded="sm"
            _text={{
              color: 'warmGray.50',
              fontWeight: 'medium',
            }}
            shadow={'3'}
          >
            <Pressable
              onPress={() => navigation.navigate('Home')}
            >
              <Text>{props.text3}</Text>
            </Pressable>
          </Center>
        </Stack>
        <Divider/>
      </VStack>
    </ScrollView>
  );
};
