import { Pressable, Text } from 'react-native';
import React from 'react';

import * as baseStyle from 'utils/styles';

interface ButtonProps {
  readonly text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [key: string]: any;
}

export const YellowButton: React.FC<ButtonProps> = (props) => {
  return (
    <Pressable style={baseStyle.yellowButton} {...props}>
      <Text>{props.text}</Text>
    </Pressable>
  );
};
