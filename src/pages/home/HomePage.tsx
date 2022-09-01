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

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const HomePage: React.FC = () => {
  const { userName } = UserStore();

  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的北京健康宝`} />
      <View style={styles.container}>
        <View style={{ marginBottom: 14 }}>
          {/* TODO: 时间 */}
          <QRCode
            color="red"
            size={200}
            value="http://people.iiis.tsinghua.edu.cn/~yuanyang/index.html"
          />
        </View>
        <AddTrace />
        <NavigableButton text="个人地点码" route="PersonalCode" />
        <NavigableButton text="轨迹查询" route="Trace" />
        <NavigableButton text="测试" route="PolicyInquiry" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.HOME} />
    </NativeBaseProvider>
  );
};
