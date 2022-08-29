import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Header } from 'components/Header';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { ScreenProps } from '../../App';
import { UserAddTraceMessage } from '../models/messages/UserAddTraceMessage'
import { APIUrl } from 'libs/api/url'
import { setGlobalUserName, setUserToken } from 'libs/UserStore';
import { TraceTable } from 'components/TraceTable';
import { POST } from 'utils/web';


const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});


export const HomePage: React.FC<ScreenProps> = ({ navigation }) => {
  const { userName, token } = UserStore();
  const [ newTrace, setNewTrace ] = useState('');

  async function AddTrace() {
    const trace = newTrace;
    try {
      const response = await POST(APIUrl, new UserAddTraceMessage(token, newTrace));
      if (response.status !== 0) throw new Error(response.message);
      // 
    } catch (e) {
      console.error(e);
    };
    setNewTrace('');
  }

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
        <Text style={styles.label}>手动登记</Text>
        <TextInput
          placeholder="手动登记"
          style={styles.input}
          value={newTrace}
          onChangeText={(newText: string) => setNewTrace(newText)}
        />
        <Pressable onPress={AddTrace} style={baseStyle.button}>
          <Text>提交新轨迹</Text> 
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
        <Pressable
          onPress={() => navigation.navigate('Applets')}
          style={baseStyle.button}
        >
          <Text>小程序</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </>
  );
};
