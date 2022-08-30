import BottomNavi, { BottomTab } from 'components/BottomNavi';
import { Header } from 'components/Header';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { UserInfo } from '../models/UserInfo';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const PersonalCodePage: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setGlobalNavigation(navigation);
  }, []);

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
            // value={JSON.stringify(trace)}
          />
        </View>
        <StatusBar style="auto" />
      </View>
      <BottomNavi tab={BottomTab.home} />
    </NativeBaseProvider>
  );
};
