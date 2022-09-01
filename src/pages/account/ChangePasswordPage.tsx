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
  setGlobalUserName,
  setUserToken,
  UserStore,
} from 'libs/UserStore';
import { UserGetProfileMessage } from 'models/messages/user/common/UserGetProfileMessage';
import { UserLoginMessage } from 'models/messages/user/common/UserLoginMessage';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { UserChangePasswordMessage } from 'models/messages/user/common/UserChangePasswordMessage';
import { alertBox } from 'utils/alert';

const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const ChangePasswordPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const [userName, setUserName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ensureNewPassword, setEnsureNewPassword] = useState('');
  const { password, token } = UserStore();
  async function changePassword() {
    if (inputPassword == password) {
      if (newPassword == ensureNewPassword){
        try {
          await send(new UserChangePasswordMessage(token, newPassword));
          alertBox('修改成功！');
          navigation.navigate('Applets');
        } catch (e) {
          console.error(e);
        }
      }
      else {
        alertBox('两次输入的新密码不匹配！');
      }

    } else {
      alertBox('旧密码不正确！');
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="修改密码" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <VStack minHeight={50}></VStack>
          <TextInput
            text={inputPassword}
            setText={setInputPassword}
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
