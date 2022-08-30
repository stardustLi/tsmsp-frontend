import BottomNavi, { BottomTab } from 'components/BottomNavi';
import { Header } from 'components/Header';
import { MyIcon } from 'components/MyIcon';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const AccountPage: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setGlobalNavigation(navigation);
  }, []);

  const { userName } = UserStore();

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
