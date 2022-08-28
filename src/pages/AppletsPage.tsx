import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Header } from 'components/Header';
import { setGlobalUserName, setUserToken } from 'libs/UserStore';
import { APIUrl } from 'libs/api/url';
import { UserAppletsMessage } from 'models/messages/UserAppletsMessage';
import * as baseStyle from 'utils/styles';
import { POST } from 'utils/web';
import type { ScreenProps } from '../../App';


const styles = StyleSheet.create({
  container: baseStyle.container,
  //button: baseStyle.button,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const AppletsPage: React.FC<ScreenProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [realName, setRealName] = useState('');

  async function Applets() {
    try {
      const response = await POST(
        APIUrl,
        new UserAppletsMessage(userName, password, realName)
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
    <>
      <Header content="小程序列表" />
      <View style={styles.container}>
        <Pressable 
          onPress={() => navigation.navigate('TraceWithPeople')}
          style={baseStyle.button}>
          <Text>和我贴贴的人</Text>
        </Pressable>
        <Pressable 
          onPress={Applets} style={baseStyle.button}>
          <Text>第二个小程序</Text>
        </Pressable>
        <Pressable 
          onPress={Applets} style={baseStyle.button}>
          <Text>第三个小程序</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={baseStyle.button}
        >
          <Text>切换至主界面</Text>
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
