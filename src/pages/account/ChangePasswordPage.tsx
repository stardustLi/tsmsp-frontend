import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, VStack } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { UserStore } from 'libs/UserStore';
import { UserChangePasswordMessage } from 'models/api/user/common/UserChangePasswordMessage';
import { alertBox } from 'utils/alert';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const ChangePasswordPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { password, token } = UserStore();

  const [inputPassword, setInputPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ensureNewPassword, setEnsureNewPassword] = useState('');

  async function changePassword() {
    if (inputPassword !== password) {
      alertBox('旧密码不正确！');
    } else if (newPassword !== ensureNewPassword) {
      alertBox('两次输入的新密码不匹配！');
    } else {
      try {
        await send(new UserChangePasswordMessage(token, newPassword));
        alertBox('修改成功！');
        navigation.navigate('Applets');
      } catch (e) {
        console.error(e);
      }
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
