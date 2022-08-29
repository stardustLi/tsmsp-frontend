import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Header } from 'components/Header';
import { setGlobalUserName, setUserToken } from 'libs/UserStore';
import { UserLoginMessage } from 'models/messages/UserLoginMessage';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import { Icon } from 'components/Icon';
import { TextIn } from 'components/TextIn';
const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const LoginPage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [idcard, setIdcard] = useState('');

  async function login() {
    try {
      const token = await send(new UserLoginMessage(userName, password));
      setGlobalUserName(userName);
      setUserToken(token);
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Header content="登录" />
      <View style={styles.container}>
        <Text style={styles.label}>用户名</Text>
        <TextInput
          placeholder="用户名"
          style={styles.input}
          value={userName}
          onChangeText={(newText: string) => setUserName(newText)}
        />
        <TextIn text={password} setText={setPassword} text2="密码" />
        <Text style={styles.label}>密码</Text>
        <TextInput
          placeholder="密码"
          style={styles.input}
          value={password}
          onChangeText={(newText: string) => setPassword(newText)}
          secureTextEntry={true}
        />
        <Text style={styles.label}>身份证号</Text>
        <TextInput
          placeholder="身份证号"
          style={styles.input}
          value={idcard}
          onChangeText={(newText: string) => setIdcard(newText)}
          secureTextEntry={true}
        />
        <Pressable onPress={login} style={baseStyle.button}>
          <Text>登录</Text>
        </Pressable>
        <Icon text="切换至注册界面" navi="Register" />
        <Icon text="小程序" navi="Applets" />
        <Icon text="测试" navi="Test" />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
