import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, VStack } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import {
  setGlobalIDCard,
  setGlobalRealName,
  setUserToken,
  UserStore,
} from 'libs/UserStore';
import { UserChangePasswordMessage } from 'models/messages/user/common/UserChangePasswordMessage';
import { UserGetProfileMessage } from 'models/messages/user/common/UserGetProfileMessage';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const ChangePasswordPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ensureNewPassword, setEnsureNewPassword] = useState('');
  const { token } = UserStore();
  async function changePassword() {
    try {
      const newToken = await send(
        new UserChangePasswordMessage(token, password)
      );
      setUserToken(newToken);
      const userInfo = await send(new UserGetProfileMessage(newToken));
      setGlobalRealName(userInfo.realName);
      setGlobalIDCard(userInfo.idCard);
      navigation.navigate('Account');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="登录" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <VStack minHeight={50}></VStack>
          <TextInput
            text={password}
            setText={setPassword}
            label="请输入旧密码"
            type="password"
          />
          <TextInput
            text={newPassword}
            setText={setNewPassword}
            label="请输入新密码"
            type="password"
          />
          <TextInput
            text={ensureNewPassword}
            setText={setEnsureNewPassword}
            label="请确认新密码"
            type="password"
          />
          <VStack minHeight={160}></VStack>
          <Button text="确认修改" onPress={changePassword} />
          <NavigableButton text="返回" route="Account" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.LOGIN} />
    </NativeBaseProvider>
  );
};
