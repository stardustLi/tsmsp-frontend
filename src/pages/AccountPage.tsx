import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text as TextNative } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Header } from 'components/Header';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { alertBox } from 'utils/alert';
import { AddTrace } from 'components/AddTrace';
import { MyIcon } from 'components/MyIcon';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import {
  NativeBaseProvider,
  Box,
  Center,
  HStack,
  Pressable,
  Icon,
  Text,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import BottomNavi, { BottomTab } from 'components/BottomNavi';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
  //press: baseStyle.press,
});
export const AccountPage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);
  const { userName } = UserStore();
  const [selected, setSelected] = React.useState(1);
  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的账号`} />
      <View style={styles.container}>
        <MyIcon text="注册新账号" navi="Register" />
        <MyIcon text="重新登录" navi="Login" />
        <MyIcon text="查看我的信息" navi="MyInfo" />
        <MyIcon text="进入管理员页面" navi="Admin" />
        <StatusBar style="auto" />
      </View>
      <BottomNavi tab={BottomTab.account} />
    </NativeBaseProvider>
  );
};
