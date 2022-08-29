import { Pressable, Text } from 'react-native';
import React from 'react';
import * as baseStyle from 'utils/styles';
import { globalNavigation } from 'utils/navigation';
import { RootStackParamList } from '../../App';

interface HeaderProps {
  readonly text: string;
  readonly navi: keyof RootStackParamList;
}

export const Icon: React.FC<HeaderProps> = (props) => {
  const navigation = globalNavigation()!;

  // function maomao(juankuan: number) {
  //   return `baozhu${juankuan}hemaomao`;
  // }
  return (
    <Pressable
      onPress={() => navigation.navigate(props.navi)}
      style={baseStyle.button}
    >
      <Text>{props.text}</Text>
    </Pressable>
  );
};
