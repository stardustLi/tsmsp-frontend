import { Pressable, Text } from 'react-native';
import React from 'react';
import { VStack, Center, ScrollView, Stack, Divider } from 'native-base';
import { globalNavigation } from 'utils/navigation';

interface HeaderProps {
  readonly text1: string;
  readonly text2: string;
  readonly text3: string;
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
            bg={`primary.${props.colour + 100}`}
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
            bg={`primary.${props.colour + 200}`}
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
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text>切换至登录界面</Text>
            </Pressable>
          </Center>
        </Stack>
        <Divider />
      </VStack>
    </ScrollView>
  );
};
