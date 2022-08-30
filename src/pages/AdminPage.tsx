import { AddTrace } from 'components/AddTrace';
import BottomNavi, { BottomTab } from 'components/BottomNavi';
import { Header } from 'components/Header';
import { MyIcon } from 'components/MyIcon';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { alertBox } from 'utils/alert';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const AdminPage: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setGlobalNavigation(navigation);
  }, []);

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
        <MyIcon text="测试" navi="PolicyInquiry" />
        <StatusBar style="auto" />
      </View>
      <BottomNavi tab={BottomTab.home} />
    </NativeBaseProvider>
  );
};
