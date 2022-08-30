import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { globalNavigation } from 'utils/navigation';
import { RootStackParamList } from '../../App';
import { propsFlattener } from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';

interface BottomBarProps {
  readonly tab: BottomTab;
}

interface BottomNaviProps extends BottomBarProps {
  readonly navi1: keyof RootStackParamList;
  readonly navi2: keyof RootStackParamList;
  readonly navi3: keyof RootStackParamList;
}

export enum BottomTab {
  home,
  applets,
  lsz,
  account,
}

const BottomNavi: React.FC<BottomNaviProps> = (props) => {
  const navigation = globalNavigation()!;
  const [selected, setSelected] = React.useState<BottomTab>(props.tab);
  const { width: widthScreen, height: heightScreen } = Dimensions.get('window');

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="red" safeAreaTop width={widthScreen} alignSelf="center">
        <Center flex={1}></Center>
        <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable
            opacity={selected === BottomTab.home ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() =>
              navigation.navigate(props.navi1)! && setSelected(BottomTab.home)
            }
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 0 ? 'home' : 'home-outline'}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Home
              </Text>
            </Center>
          </Pressable>
          <Pressable
            opacity={selected === BottomTab.applets ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() =>
              navigation.navigate(props.navi2)! &&
              setSelected(BottomTab.applets)
            }
          >
            <Center>
              <Icon
                mb="1"
                as={<MaterialCommunityIcons name="menu" />}
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Applets
              </Text>
            </Center>
          </Pressable>
          <Pressable
            opacity={selected === BottomTab.lsz ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() =>
              navigation.navigate(props.navi3)! && setSelected(BottomTab.lsz)
            }
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 2 ? 'cart' : 'cart-outline'}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Cart
              </Text>
            </Center>
          </Pressable>
          <Pressable
            opacity={selected === BottomTab.account ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => setSelected(3)}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={
                      selected === BottomTab.account
                        ? 'account'
                        : 'account-outline'
                    }
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Account
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
};

const BottomBar: React.FC<BottomBarProps> = props => {
  return (
    <Center flex={1} px="3">
      <BottomNavi navi1="Home" navi2="Applets" navi3="Login" tab={props.tab} />
    </Center>
  );
};

export default BottomBar;
