import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, useToken } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { setAdmin, UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { GetAdminPermissionMessage } from 'models/messages/user/admin/GetAdminPermissionMessage';

const styles = StyleSheet.create({
  container: baseStyle.container,
});


export const AccountPage: React.FC = () => {
  const { userName,token,admin } = UserStore();


  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的账号`} />
      <View style={styles.container}>
        <NavigableButton text="注册新账号" route="Register" />
        <NavigableButton text="重新登录" route="Login" />
        <NavigableButton text="查看我的信息" route="MyInfo" />
        <NavigableButton text="修改密码" route="ChangePassword" />
        <NavigableButton text="权限管理" route="Authority" />
        {admin ? (
          <NavigableButton text="进入管理员页面" route="Admin" />
        ):(
          <></>
        )}
        
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.ACCOUNT} />
    </NativeBaseProvider>
  );
};
