import { Badge, Box, HStack, VStack } from 'native-base';
import React from 'react';

interface LabelProps {
  readonly text: string;
}

export const Label: React.FC<LabelProps> = (props) => {
  return (
    <Box alignItems="center">
      <HStack
        space={4}
        mx={{
          base: 'auto',
          md: '0',
        }}
      >
        <VStack space={4}>
          <Badge colorScheme="info" alignSelf="center" variant="outline">
            {props.text}
          </Badge>
        </VStack>
      </HStack>
    </Box>
  );
};
