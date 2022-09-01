import React from 'react';

import { Button } from 'components/ui/Button';
import { globalNavigation } from 'utils/navigation';
import type { TabNames } from '../../../App';

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
