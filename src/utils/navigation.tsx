import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import create from 'zustand';

import type { TabNames } from '../../App';

type RootStackParamList = { [key in TabNames]: undefined };
type ScreenProps = NativeStackScreenProps<RootStackParamList>;
type NavigationType = NativeStackNavigationProp<{ [key: string]: undefined }>;

export const globalNavigation = create<NavigationType | null>(() => null);
export const setGlobalNavigation = (navigation: NavigationType) =>
  globalNavigation.setState(navigation);

export function PageWrapper(Page: React.FC) {
  const WrappedPage: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
    useEffect(() => {
      setGlobalNavigation(navigation as any as NavigationType);
    }, []);

    return <Page />;
  };
  return WrappedPage;
}
