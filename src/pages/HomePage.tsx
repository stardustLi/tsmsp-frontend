import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Header } from 'components/Header';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { ScreenProps } from '../../App';

const styles = StyleSheet.create({
  container: baseStyle.container,
  //button: baseStyle.button,
});

export const HomePage: React.FC<ScreenProps> = ({ navigation }) => {
  const { userName } = UserStore();

  return (
    <>
      <Header content={`${userName} 的健康宝`} />
      <View style={styles.container}>
        <View style={{ marginBottom: 14 }}>
          <QRCode
            color="red"
            size={200}
            value="http://people.iiis.tsinghua.edu.cn/~yuanyang/index.html"
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate('ScanQRCode')}
          style={baseStyle.button}
        >
          <Text>扫场所码登记</Text>
        </Pressable>
        <Pressable
          /*onPress={() => navigation.navigate('ScanQRCode')}*/
          style={baseStyle.button}
        >
          <Text>手动登记</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Trace')}
          style={baseStyle.button}
        >
          <Text>轨迹查询</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Test')}
          style={baseStyle.button}
        >
          <Text>测试</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </>
  );
};
