import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const AccountPage: React.FC = () => {
  const { userName } = UserStore();

  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的账号`} />
      <View style={styles.container}>
        <NavigableButton text="注册新账号" route="Register" />
        <NavigableButton text="重新登录" route="Login" />
        <NavigableButton text="查看我的信息" route="MyInfo" />
        <NavigableButton text="权限管理" route="Authority" />
        <NavigableButton text="进入管理员页面" route="Home" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.ACCOUNT} />
    </NativeBaseProvider>
  );
};
