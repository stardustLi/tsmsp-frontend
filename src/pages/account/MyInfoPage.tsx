import BottomNavi, { BottomTab } from 'components/BottomNavi';
import { Header } from 'components/Header';
import { Label } from 'components/Label';
import { NavigableButton } from 'components/NavigableButton';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const MyInfoPage: React.FC = () => {
  const { userName } = UserStore();

  const [idCard] = useState('');

  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的账号信息`} />
      <View style={styles.container}>
        <NavigableButton text="注册新账号" route="Register" />
        <Label text="用户名" />
        <VStack space={1} alignItems="center">
          <Text>{userName}</Text>
        </VStack>
        <Label text="姓名" />
        <Label text="身份证号" />
        <VStack space={1} alignItems="center">
          <Text>{idCard}</Text>
        </VStack>
        <NavigableButton text="返回" route="Account" />
        <StatusBar style="auto" />
      </View>

      <BottomNavi tab={BottomTab.ACCOUNT} />
    </NativeBaseProvider>
  );
};
