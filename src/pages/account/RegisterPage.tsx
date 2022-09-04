import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import {
  setGlobalIDCard,
  setGlobalPassword,
  setGlobalRealName,
  setGlobalUserName,
  setUserToken,
  setAdmin,
} from 'libs/UserStore';
import { UserRegisterMessage } from 'models/messages/user/common/UserRegisterMessage';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { GetAdminPermissionMessage } from 'models/messages/user/admin/GetAdminPermissionMessage';

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
  async function getAdmin() {}

  async function register() {
    try {
      const token = await send(
        new UserRegisterMessage(userName, password, realName, idCard)
      );
      setGlobalUserName(userName);
      setGlobalPassword(password);
      setGlobalRealName(realName);
      setGlobalIDCard(idCard.toLowerCase());
      setUserToken(token);
      const admin = await send(new GetAdminPermissionMessage(token));
      setAdmin(admin);
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
          onChangeText={setUserName}
        />
        <Text style={styles.label}>密码</Text>
        <TextInput
          placeholder="密码"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Text style={styles.label}>真实姓名</Text>
        <TextInput
          placeholder="真实姓名"
          style={styles.input}
          value={realName}
          onChangeText={setRealName}
        />
        <Text style={styles.label}>身份证号</Text>
        <TextInput
          placeholder="身份证号"
          style={styles.input}
          value={idCard}
          onChangeText={setIdCard}
        />
        <Button text="注册" onPress={register} />
        <Button
          text="切换至登录界面"
          onPress={() => navigation.navigate('Login')}
        />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
