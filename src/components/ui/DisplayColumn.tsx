import React from "react";
import { Box, Center, NativeBaseProvider } from "native-base";

interface DisplayColumnProps {
  readonly text: string;
  readonly color?: string;
  readonly [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export const DisplayColumn: React.FC<DisplayColumnProps> = (props) => {
  const myRef = React.useRef({});
  React.useEffect(() => {
  }, [myRef]);

  return <Box 
    borderWidth="4" 
    borderRadius="4"
    borderColor={`${props.color}.600`}
    width="60%" 
    height="10%"
    bg={`${props.color}.300`}
    p="4" 
    shadow={2} _text={{
      fontSize: "md",
      fontWeight: "bold",
      color: "black"
    }} 
    ref={myRef}>
      {props.text}
    </Box>;
    // <Center h="50" left={-100}>
    //   <ZStack alignItems="center" justifyContent="center">
    //     <Text>{props.text}</Text>
    //     <Box bg="indigo.700" size="10" rounded="lg" />
    //     <Box bg="indigo.300" size="8" rounded="lg" shadow={8} />
    //   </ZStack>
    // </Center>
};
