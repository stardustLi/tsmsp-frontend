import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Header } from 'components/Header';
import { setGlobalUserName, setUserToken } from 'libs/UserStore';
import { APIUrl } from 'libs/api/url';
import { UserLoginMessage } from 'models/messages/UserLoginMessage';
import * as baseStyle from 'utils/styles';
import { POST } from 'utils/web';
import type { ScreenProps } from '../../App';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const LoginPage: React.FC<ScreenProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      console.log(APIUrl);
      const response = await POST(
        APIUrl,
        new UserLoginMessage(userName, password)
      );
      if (response.status !== 0) throw new Error(response.message);
      setGlobalUserName(userName);
      setUserToken(response.message);
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
        <Text style={styles.label}>密码</Text>
        <TextInput
          placeholder="密码"
          style={styles.input}
          value={password}
          onChangeText={(newText: string) => setPassword(newText)}
          secureTextEntry={true}
        />
        <Pressable
          onPress={login}
          style={baseStyle.button}
        >
          <Text>登录</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={baseStyle.button}
        >
          <Text>切换至注册界面</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </>
  );
};
