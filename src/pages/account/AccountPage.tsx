import BottomNavi, { BottomTab } from 'components/BottomNavi';
import { Header } from 'components/Header';
import { NavigableButton } from 'components/NavigableButton';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
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
        <NavigableButton text="进入管理员页面" route="Admin" />
        <StatusBar style="auto" />
      </View>
      <BottomNavi tab={BottomTab.ACCOUNT} />
    </NativeBaseProvider>
  );
};