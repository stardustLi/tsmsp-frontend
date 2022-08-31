import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import create from 'zustand';
import { TabNames } from '../../App';

type RootStackParamList = { [key in TabNames]: undefined };
type ScreenProps = NativeStackScreenProps<RootStackParamList>;
type NavigationType = NativeStackNavigationProp<RootStackParamList>;

export const globalNavigation = create<NavigationType | null>(() => null);
export const setGlobalNavigation = (navigation: NavigationType) =>
  globalNavigation.setState(navigation);

export function PageWrapper(Page: React.FC) {
  const WrappedPage: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
    useEffect(() => {
      setGlobalNavigation(navigation);
    }, []);

    return <Page />;
  };
  return WrappedPage;
}
