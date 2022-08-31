import { Header } from 'components/Header';
import { StatusBar } from 'expo-status-bar';
import {
  setGlobalIDCard,
  setGlobalRealName,
  setGlobalUserName,
  setUserToken
} from 'libs/UserStore';
import { UserRegisterMessage } from 'models/messages/UserRegisterMessage';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const RegisterPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [realName, setRealName] = useState('');
  const [idCard, setIdCard] = useState('');

  async function register() {
    try {
      const token = await send(
        new UserRegisterMessage(userName, password, realName, idCard)
      );
      setGlobalUserName(userName);
      setGlobalRealName(realName);
      setGlobalIDCard(idCard);
      setUserToken(token);
      navigation.navigate('Trace');
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
          value={idCard}
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
