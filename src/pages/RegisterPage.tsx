import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Header } from 'components/Header';
import { setGlobalUserName, setUserToken } from 'libs/UserStore';
import { APIUrl } from 'libs/api/url';
import { UserRegisterMessage } from 'models/messages/UserRegisterMessage';
import * as baseStyle from 'utils/styles';
import { POST } from 'utils/web';
import type { ScreenProps } from '../../App';

const styles = StyleSheet.create({
  container: baseStyle.container,
  //button: baseStyle.button,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const RegisterPage: React.FC<ScreenProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [realName, setRealName] = useState('');
  const [idcard, setIdCard] = useState('');

  async function register() {
    try {
      const response = await POST(
        APIUrl,
        new UserRegisterMessage(userName, password, realName, idcard)
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
      <Header content="注册" />
      <View style={styles.container}>
        <Text style={styles.label}>用户名</Text>
        <TextInput
          placeholder="用户名"
          style={styles.input}
          value={userName}
          onChangeText={(newText) => setUserName(newText)}
        />
        <Text style={styles.label}>密码</Text>
        <TextInput
          placeholder="密码"
          style={styles.input}
          value={password}
          onChangeText={(newText) => setPassword(newText)}
          secureTextEntry={true}
        />
        <Text style={styles.label}>真实姓名</Text>
        <TextInput
          placeholder="真实姓名"
          style={styles.input}
          value={realName}
          onChangeText={(newText) => setRealName(newText)}
        />
        <Text style={styles.label}>身份证号</Text>
        <TextInput
          placeholder="身份证号"
          style={styles.input}
          value={idcard}
          onChangeText={(newText) => setIdCard(newText)}
        />
        <Pressable onPress={register} style={baseStyle.button}>
          <Text>注册</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={baseStyle.button}
        >
          <Text>切换至登录界面</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </>
  );
};
