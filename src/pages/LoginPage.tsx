import { Header } from 'components/Header';
import { MyIcon } from 'components/MyIcon';
import { TextIn } from 'components/TextIn';
import { StatusBar } from 'expo-status-bar';
import { setGlobalIDCard, setGlobalRealName, setGlobalUserName, setUserToken } from 'libs/UserStore';
import { UserGetProfileMessage } from 'models/messages/UserGetProfileMessage';
import { UserLoginMessage } from 'models/messages/UserLoginMessage';
import { NativeBaseProvider, VStack } from 'native-base';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text, View
} from 'react-native';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
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
      const userInfo = await send(new UserGetProfileMessage(token));
      setGlobalRealName(userInfo.realName);
      setGlobalIDCard(userInfo.idCard);
      console.log(userInfo);
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <ScrollView>
        <NativeBaseProvider>
          <VStack space="2.5" mt="20" px="8"></VStack>
          <Header content="登录" />
          <View style={styles.container}>
            <TextIn
              text={idcard}
              setText={setIdcard}
              text2="身份证号"
              type={undefined}
            />
            <TextIn
              text={userName}
              setText={setUserName}
              text2="用户名"
              type={undefined}
            />
            <TextIn
              text={password}
              setText={setPassword}
              text2="密码"
              type="password"
            />
            <Pressable onPress={login} style={baseStyle.button}>
              <Text>登录</Text>
            </Pressable>
            <MyIcon text="切换至注册界面" navi="Register" />
            <MyIcon text="小程序" navi="Applets" />
            <MyIcon text="测试" navi="PolicyInquiry" />
            <StatusBar style="auto" />
          </View>
        </NativeBaseProvider>
      </ScrollView>
    </>
  );
};
