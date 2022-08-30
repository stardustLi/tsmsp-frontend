import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text as TextNative } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Header } from 'components/Header';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { alertBox } from 'utils/alert';
import { AddTrace } from 'components/AddTrace';
import { MyIcon } from 'components/MyIcon';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import { UserInfo } from '../models/UserInfo';
import {
  NativeBaseProvider,
  Box,
  Center,
  HStack,
  Pressable,
  Icon,
  Text,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import BottomNavi, { BottomTab } from 'components/BottomNavi';
const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
  //press: baseStyle.press,
});
export const PersonalCodePage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);
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
