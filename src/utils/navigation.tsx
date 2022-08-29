import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import create from 'zustand';
import { RootStackParamList } from '../../App';

export type ScreenProps = NativeStackScreenProps<RootStackParamList>;
export type NavigationType = NativeStackNavigationProp<RootStackParamList>;

export const globalNavigation = create<NavigationType | null>(() => null);

export const setGlobalNavigation = (navigation: NavigationType) =>
  globalNavigation.setState(navigation);
