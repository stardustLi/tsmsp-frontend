import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from 'components/Header';
import { MyBox } from 'components/MyBox';
import { UserTestMessage } from 'models/messages/UserTestMessage';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { MyIcon as Icon } from 'components/MyIcon';
import { NativeBaseProvider } from 'native-base';
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
      const response = await send(
        new UserTestMessage(userName, password, realName)
      );
      navigation.navigate('Trace');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="小程序" />
      <View style={styles.container}>
        {/* <MyBox
          text1="box1"
          text2="box2"
          text3="返回"
          colour={300}
          navi2={'Trace'}
        />
        <MyBox
          text1="box1"
          text2="box2"
          text3="返回"
          colour={400}
          navi2={'Trace'}
        />
        <MyBox
          text1="box1"
          text2="box2"
          text3="返回"
          colour={500}
          navi2={'Trace'}
        />
        <MyBox
          text1="box1"
          text2="box2"
          text3="返回"
          colour={600}
          navi2={'Trace'}
        /> */}
        <Icon text="返回" navi="Home" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
