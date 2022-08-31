import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { NavigableButton } from 'components/NavigableButton';
import { TextInput } from 'components/TextInput';
import { StatusBar } from 'expo-status-bar';
import {
  setGlobalIDCard,
  setGlobalRealName,
  setGlobalUserName,
  setUserToken,
} from 'libs/UserStore';
import { UserGetProfileMessage } from 'models/messages/UserGetProfileMessage';
import { UserLoginMessage } from 'models/messages/UserLoginMessage';
import { NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
      const userInfo = await send(new UserGetProfileMessage(token));
      setGlobalRealName(userInfo.realName);
      setGlobalIDCard(userInfo.idCard);
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
