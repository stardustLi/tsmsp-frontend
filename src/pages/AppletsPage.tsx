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
import { Icon } from 'components/Icon';
//import theme, { ITheme } from "./theme";

const styles = StyleSheet.create({
  container: baseStyle.container,
  //button: baseStyle.button,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const AppletsPage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [realName, setRealName] = useState('');

  async function Applets() {
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
      <Header content="小程序" />
      <View style={styles.container}>
        <MyBox text1="box1" text2="box2" text3="返回" colour={300} />
        <MyBox text1="box1" text2="box2" text3="返回" colour={400} />
        <MyBox text1="box1" text2="box2" text3="返回" colour={500} />
        <MyBox text1="box1" text2="box2" text3="返回" colour={600} />
        <Icon text="返回" navi='Home'/>
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
