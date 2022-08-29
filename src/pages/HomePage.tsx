import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Header } from 'components/Header';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { alertBox } from 'utils/alert';
import { AddTrace } from 'components/AddTrace';
import { Icon } from 'components/Icon';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});
export const HomePage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);
  alertBox('Fish is coming!!!');
  const { userName } = UserStore();
  return (
    <>
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
        <Icon text="轨迹查询" navi="Trace" />
        <Icon text="测试" navi="Test" />
        <Icon text="小程序" navi="Applets" />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
