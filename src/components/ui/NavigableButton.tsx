import React from 'react';
import { globalNavigation } from 'utils/navigation';

import { Button } from 'components/ui/Button';
import type { TabNames } from '../../../App';
import { color } from 'native-base/lib/typescript/theme/styled-system';


interface NavigableButtonProps {
  readonly text: string;
  readonly route: TabNames;
  readonly color?: string;
}

export const NavigableButton: React.FC<NavigableButtonProps> = (props) => {
  const navigation = globalNavigation()!;

  return (
    <Button
      color={props.color}
      text={props.text}
      onPress={() => navigation.navigate(props.route)}
    />
  );
};
