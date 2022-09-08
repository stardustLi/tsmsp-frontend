import { Pressable, Text } from 'react-native';
import React from 'react';

import * as baseStyle from 'utils/styles';

interface ButtonProps {
  readonly text: string;
  readonly color?: string;
  readonly textColor?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colorMapping: { [key: string]: any } = {
  yellow: baseStyle.yellowButton,
};

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Pressable
      style={colorMapping?.[props.color!] ?? baseStyle.button}
      {...props}
    >
      <Text style={props.textColor ? {color: props.textColor} : null}>{props.text}</Text>
    </Pressable>
  );
};
