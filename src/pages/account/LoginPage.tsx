import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Stack } from 'native-base';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';

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
import { GetAdminPermissionMessage } from 'models/api/user/admin/GetAdminPermissionMessage';
import { UserGetProfileMessage } from 'models/api/user/common/UserGetProfileMessage';
import { UserLoginMessage } from 'models/api/user/common/UserLoginMessage';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

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
      await Promise.all([
        send(new UserGetProfileMessage(token)).then((userInfo) => {
          setGlobalPassword(userInfo.password);
          setGlobalRealName(userInfo.realName);
          setGlobalIDCard(userInfo.idCard);
        }),
        send(new GetAdminPermissionMessage(token)).then(setAdmin),
      ]);
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
            <ImageBackground source={require('../../assets/lsz.png')} style={{ width: '100%', height: '100%' }}>
      <Header content="登录" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <Stack minHeight={100}></Stack>
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
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      </ImageBackground>
    </NativeBaseProvider>
  );
};
