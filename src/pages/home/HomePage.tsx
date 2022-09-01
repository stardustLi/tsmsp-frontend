import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { AddTrace } from 'components/AddTrace';
import { BottomBar, BottomTab } from 'components/BottomBar';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { MyQRCode } from 'components/MyQRCode';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const HomePage: React.FC = () => {
  const { userName } = UserStore();

  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的猫宽健康宝`} />
      <View style={styles.container}>
        <View style={{ marginBottom: 14 }}>
          <MyQRCode color="red" />
        </View>
        <AddTrace />
        <NavigableButton text="我的贴贴码" route="PersonalCode" />
        <NavigableButton text="轨迹查询" route="Trace" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.HOME} />
    </NativeBaseProvider>
  );
};
