import { Box } from 'native-base';
import React from 'react';

interface DisplayColumnProps {
  readonly text: string;
  readonly color?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [key: string]: any;
}

export const DisplayColumn: React.FC<DisplayColumnProps> = (props) => {
  const myRef = React.useRef({});

  return (
    <Box
      borderWidth="4"
      borderRadius="4"
      borderColor={`${props.color}.600`}
      width="60%"
      height="10%"
      bg={`${props.color}.300`}
      p="4"
      shadow={2}
      _text={{
        fontSize: 'md',
        fontWeight: 'bold',
        color: 'black',
      }}
      ref={myRef}
    >
      {props.text}
    </Box>
  );
};
