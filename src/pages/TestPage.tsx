import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Header } from 'components/Header';
import { MyBox } from 'components/MyBox';
import { setGlobalUserName, setUserToken } from 'libs/UserStore';
import { APIUrl } from 'libs/api/url';
import { UserTestMessage } from 'models/messages/UserTestMessage';
import * as baseStyle from 'utils/styles';
import { POST } from 'utils/web';
//import "./styles.css";
import {NativeBaseProvider,} from 'native-base';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
//import theme, { ITheme } from "./theme";

const styles = StyleSheet.create({
  container: baseStyle.container,
  //button: baseStyle.button,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const TestPage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [realName, setRealName] = useState('');

  async function Test() {
    try {
      const response = await POST(
        APIUrl,
        new UserTestMessage(userName, password, realName)
      );
      if (response.status !== 0) throw new Error(response.message);
      setGlobalUserName(userName);
      setUserToken(response.message);
      navigation.navigate('Trace');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="注册test" />
      <View style={styles.container}>
        <MyBox content="ttt" text="aaa" />
        <Text style={styles.label}>用户名</Text>
        <TextInput
          placeholder="用户名"
          style={styles.input}
          value={userName}
          onChangeText={(newText) => setUserName(newText)}
        />
        <Pressable onPress={Test} style={baseStyle.button}>
          <Text>注册</Text>
        </Pressable>

        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
