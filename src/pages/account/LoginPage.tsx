import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import {
  setAdmin,
  setGlobalIDCard,
  setGlobalPassword,
  setGlobalRealName,
  setGlobalUserName,
  setUserToken,
} from 'libs/UserStore';
import { UserGetProfileMessage } from 'models/messages/user/common/UserGetProfileMessage';
import { UserLoginMessage } from 'models/messages/user/common/UserLoginMessage';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { GetAdminPermissionMessage } from 'models/messages/user/admin/GetAdminPermissionMessage';

const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const LoginPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [idcard, setIdcard] = useState('');

  async function login() {
    try {
      const token = await send(new UserLoginMessage(userName, password));
      setGlobalUserName(userName);
      setUserToken(token);
      const userInfo = await send(new UserGetProfileMessage(token));
      setGlobalPassword(userInfo.password);
      setGlobalRealName(userInfo.realName);
      setGlobalIDCard(userInfo.idCard);
      const admin = await send(new GetAdminPermissionMessage(token)); 
      setAdmin(admin);
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="登录" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <TextInput
            text={idcard}
            setText={setIdcard}
            label="身份证号"
            type={undefined}
          />
          <TextInput
            text={userName}
            setText={setUserName}
            label="用户名"
            type={undefined}
          />
          <TextInput
            text={password}
            setText={setPassword}
            label="密码"
            type="password"
          />
          <Button text="登录" onPress={login} />
          <NavigableButton text="切换至注册界面" route="Register" />
          <NavigableButton text="小程序" route="Applets" />
          <NavigableButton text="测试" route="PolicyInquiry" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.LOGIN} />
    </NativeBaseProvider>
  );
};
