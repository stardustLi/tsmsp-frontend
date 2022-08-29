import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Header } from 'components/Header';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { alertBox } from 'models/messages/MessageBox';
import { AddTrace } from 'components/AddTrace';
import { Icon } from 'components/Icon'
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});
export const HomePage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);
  alertBox('Fish is coming!!!');
  const { userName, token } = UserStore();
  const [newTrace, setNewTrace] = useState('');
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
        <Icon text='轨迹查询' navi='Trace'/>
        <Icon text='小程序' navi='Applets'/>
        <Icon text='测试' navi='Test'/>
        <StatusBar style="auto" />
      </View>
    </>
  );
};
