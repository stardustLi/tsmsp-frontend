import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  Heading,
  VStack,
  Center,
  ScrollView,
  Stack,
  Divider,
} from 'native-base';
import { globalNavigation } from 'utils/navigation';
interface HeaderProps {
  readonly content: string;
  readonly text: String;
}

export const MyBox: React.FC<HeaderProps> = (props) => {
  const navigation = globalNavigation()!;

  return (
    <ScrollView>
      <VStack space="2.5" mt="4" px="8">
        <Heading size="md">header</Heading>
        <Stack direction="row" mb="2.5" mt="1.5" space={3}>
          <Center
            size="16"
            bg="primary.400"
            rounded="sm"
            _text={{
              color: 'warmGray.50',
              fontWeight: 'medium',
            }}
            shadow={'3'}
          >
            <Text>{props.content}</Text>
          </Center>
          <Center
            bg="primary.500"
            size="16"
            rounded="sm"
            _text={{
              color: 'warmGray.50',
              fontWeight: 'medium',
            }}
            shadow={'3'}
          >
            Box 2
          </Center>
          <Center
            size="16"
            bg="primary.700"
            rounded="sm"
            _text={{
              color: 'warmGray.50',
              fontWeight: 'medium',
            }}
            shadow={'3'}
          >
            Box 3
          </Center>
          <Center
            size="16"
            bg="primary.700"
            rounded="sm"
            _text={{
              color: 'warmGray.50',
              fontWeight: 'medium',
            }}
            shadow={'3'}
          >
            Box 4
            <Pressable
              onPress={() => navigation.navigate('Login')}
            >
              <Text>切换至登录界面</Text>
            </Pressable>
          </Center>
        </Stack>
        <Divider/>
      </VStack>
    </ScrollView>
  );
};
