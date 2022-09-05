import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Box,
  Center,
  HStack,
  Icon,
  NativeBaseProvider,
  Pressable,
  Text,
} from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

import { globalNavigation } from 'utils/navigation';
import type { TabNames } from '../../App';

interface BottomBarProps {
  readonly tab: BottomTab;
}

export enum BottomTab {
  HOME,
  APPLETS,
  SCAN,
  ACCOUNT,
}

const tabs = {
  Home: {
    tab: BottomTab.HOME,
    text: 'Home',
    icon: 'home-outline' as const,
    activeIcon: 'home' as const,
  },
  Applets: {
    tab: BottomTab.APPLETS,
    text: 'Applets',
    icon: 'menu' as const,
    activeIcon: 'menu' as const,
  },
  Login: {
    tab: BottomTab.SCAN,
    text: 'Scan',
    icon: 'camera-outline' as const,
    activeIcon: 'camera' as const,
  },
  Account: {
    tab: BottomTab.ACCOUNT,
    text: 'Account',
    icon: 'account-outline' as const,
    activeIcon: 'account' as const,
  },
};

const BottomNavi: React.FC<BottomBarProps> = (props) => {
  const navigation = globalNavigation()!;
  const [selected, setSelected] = React.useState<BottomTab>(props.tab);
  const { width: widthScreen } = Dimensions.get('window');

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="red" safeAreaTop width={widthScreen} alignSelf="center">
        <Center flex={1}></Center>
        <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
          {Object.entries(tabs).map(
            ([key, { tab, text, icon, activeIcon }]) => {
              const isSelected = selected === tab;
              return (
                <Pressable
                  key={key}
                  opacity={isSelected ? 1 : 0.5}
                  py="2"
                  flex={1}
                  onPress={() => {
                    navigation.navigate(key);
                    setSelected(tab);
                  }}
                >
                  <Center>
                    <Icon
                      mb="1"
                      as={
                        <MaterialCommunityIcons
                          name={isSelected ? activeIcon : icon}
                        />
                      }
                      color="white"
                      size="sm"
                    />
                    <Text color="white" fontSize="12">
                      {text}
                    </Text>
                  </Center>
                </Pressable>
              );
            }
          )}
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

export const BottomBar: React.FC<BottomBarProps> = (props) => {
  return (
    <Center height={50} px="3">
      <BottomNavi tab={props.tab} />
    </Center>
  );
};
