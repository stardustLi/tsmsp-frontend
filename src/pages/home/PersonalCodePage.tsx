import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { UserInfo } from 'models/UserInfo';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const PersonalCodePage: React.FC = () => {
  const { userName } = UserStore();

  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的个人地点码`} />
      <View style={styles.container}>
        <View style={{ marginBottom: 14 }}>
          <QRCode color="black" size={300} value={JSON.stringify(UserInfo)} />
        </View>
        <NavigableButton text="返回" route="Home" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.HOME} />
    </NativeBaseProvider>
  );
};
