import { Center, Divider, Heading, Stack, VStack } from 'native-base';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import type { TabNames } from '../../App';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label2,
});

interface AppletsRowProps {
  readonly title?: string;
  readonly colour: number;
  readonly tone?: string;
  readonly applets: {
    text: string;
    route: TabNames;
  }[];
}

export const AppletsRow: React.FC<AppletsRowProps> = (props) => {
  const navigation = globalNavigation()!;
  const tone = props.tone ?? 'info';

  return (
    <VStack space="2.5" mt="4" px="8">
      <Heading size="md">{props.title}</Heading>
      <Stack direction="row" mb="2.5" mt="1.5" space={3}>
        {props.applets.map(({ text, route }, idx) => (
          <Center
            key={text}
            size="24"
            bg={`${tone}.${props.colour + idx * 100}`}
            rounded="sm"
            _text={{
              color: 'warmGray.50',
              fontWeight: 'medium',
            }}
            shadow="3"
          >
            <Pressable onPress={() => navigation.navigate(route)}>
              <Text style={styles.label}>{text}</Text>
            </Pressable>
          </Center>
        ))}
      </Stack>
      <Divider />
    </VStack>
  );
};
