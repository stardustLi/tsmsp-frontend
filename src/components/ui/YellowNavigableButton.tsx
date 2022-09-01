import React from 'react';
import { globalNavigation } from 'utils/navigation';

import { YellowButton } from 'components/ui/YellowButton';
import type { TabNames } from '../../../App';
import { color } from 'native-base/lib/typescript/theme/styled-system';


interface NavigableButtonProps {
  readonly text: string;
  readonly route: TabNames;
  readonly color?: string;
}

export const YellowNavigableButton: React.FC<NavigableButtonProps> = (props) => {
  const navigation = globalNavigation()!;

  return (
    <YellowButton
      color={props.color}
      text={props.text}
      onPress={() => navigation.navigate(props.route)}
    />
  );
};
