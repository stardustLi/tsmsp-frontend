import { Pressable } from 'react-native';
import React from 'react';
import * as baseStyle from 'utils/styles';
import { globalNavigation } from 'utils/navigation';
import { RootStackParamList } from '../../App';
import {
  Box,
  HStack,
  VStack,
  Badge,
  NativeBaseProvider,
  Text,
} from 'native-base';

interface MyBadgeProps {
  readonly text: string;
  //readonly navi: keyof RootStackParamList;
}

export const MyBadge: React.FC<MyBadgeProps> = (props) => {
  const navigation = globalNavigation()!;

  // function maomao(juankuan: number) {
  //   return `baozhu${juankuan}hemaomao`;
  // }
  return (
    <NativeBaseProvider>
      <Box alignItems="center">
        <HStack
          space={4}
          mx={{
            base: 'auto',
            md: '0',
          }}
        >
          {['outline'].map((key) => (
            <VStack key={key} space={4}>
              <Badge colorScheme="info" alignSelf="center" variant={key}>
                {props.text}
              </Badge>
            </VStack>
          ))}
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};
