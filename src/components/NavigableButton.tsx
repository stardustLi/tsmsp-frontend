import React from 'react';
import { globalNavigation } from 'utils/navigation';
import type { TabNames } from '../../App';
import { Button } from 'components/Button';

interface NavigableButtonProps {
  readonly text: string;
  readonly route: TabNames;
}

export const NavigableButton: React.FC<NavigableButtonProps> = (props) => {
  const navigation = globalNavigation()!;

  return (
    <Button
      text={props.text}
      onPress={() => navigation.navigate(props.route)}
    />
  );
};
