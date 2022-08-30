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
export const HomePage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);
  alertBox('Fish is coming!!!');
  const { userName } = UserStore();
  const [selected, setSelected] = React.useState(1);
  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的北京健康宝`} />
      <View style={styles.container}>
        <View style={{ marginBottom: 14 }}>
          <QRCode
            color="red"
            size={200}
            value="http://people.iiis.tsinghua.edu.cn/~yuanyang/index.html"
          />
        </View>
        <AddTrace />
        <MyIcon text="轨迹查询" navi="Trace" />
        <MyIcon text="测试" navi="Appeal" />
        <MyIcon text="小程序" navi="Applets" />
        <StatusBar style="auto" />
      </View>
      <BottomNavi tab={BottomTab.home} />
    </NativeBaseProvider>
  );
};
