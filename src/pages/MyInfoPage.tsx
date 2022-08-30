import BottomNavi, { BottomTab } from 'components/BottomNavi';
import { Header } from 'components/Header';
import { MyBadge } from 'components/MyBadge';
import { MyIcon } from 'components/MyIcon';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import {
  NativeBaseProvider, Text,
  VStack
} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
  //press: baseStyle.press,
});
export const MyInfoPage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);
  const { userName } = UserStore();
  const [idCard] = useState('');
  const [selected, setSelected] = React.useState(1);
  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的账号信息`} />
      <View style={styles.container}>
        <MyIcon text="注册新账号" navi="Register" />
        {/* <MyBadge text="用户名"/> */}
        <MyBadge text="用户名" />
        <VStack space={1} alignItems="center">
          <Text>{userName}</Text>
        </VStack>
        <MyBadge text="姓名" />
        <MyBadge text="身份证号" />
        <VStack space={1} alignItems="center">
          <Text>{idCard}</Text>
        </VStack>
        <MyIcon text="返回" navi="Account" />
        <StatusBar style="auto" />
      </View>

      <BottomNavi tab={BottomTab.account} />
    </NativeBaseProvider>
  );
};
