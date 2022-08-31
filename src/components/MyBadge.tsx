import { Badge, Box, HStack, NativeBaseProvider, VStack } from 'native-base';
import React from 'react';

interface MyBadgeProps {
  readonly text: string;
}

export const MyBadge: React.FC<MyBadgeProps> = (props) => {
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
