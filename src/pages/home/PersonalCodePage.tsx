import BottomNavi, { BottomTab } from 'components/BottomNavi';
import { Header } from 'components/Header';
import { NavigableButton } from 'components/NavigableButton';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
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
          <QRCode
            color="black"
            size={300}
            value={JSON.stringify(UserInfo)}
          />
        </View>
        <NavigableButton text="返回" route="Home" />
        <StatusBar style="auto" />
      </View>
      <BottomNavi tab={BottomTab.HOME} />
    </NativeBaseProvider>
  );
};
