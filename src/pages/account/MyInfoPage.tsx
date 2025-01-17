import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Header } from 'components/ui/Header';
import { Label } from 'components/ui/Label';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const MyInfoPage: React.FC = () => {
  const { userName, realName, idCard } = UserStore();

  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require('../../assets/lsz.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <Header content={`${userName} 的账号信息`} />
        <View style={styles.container}>
          <Label text="用户名" />
          <VStack space={1} alignItems="center">
            <Text>{userName}</Text>
          </VStack>
          <Label text="姓名" />
          <VStack space={1} alignItems="center">
            <Text>{realName}</Text>
          </VStack>
          <Label text="身份证号" />
          <VStack space={1} alignItems="center">
            <Text>{idCard}</Text>
          </VStack>
          <NavigableButton text="注册新账号" route="Register" />
          <NavigableButton text="登录其它账号" route="Login" />
          <NavigableButton text="返回" route="Account" />
          <StatusBar style="auto" />
        </View>
        <BottomBar tab={BottomTab.ACCOUNT} />
      </ImageBackground>
    </NativeBaseProvider>
  );
};
