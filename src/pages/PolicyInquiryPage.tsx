import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Header } from 'components/Header';
import { MyBox } from 'components/MyBox';
import { UserStore } from 'libs/UserStore';
import { APIUrl } from 'libs/api/url';
import { PolicyQueryMessage } from 'models/messages/PolicyQueryMessage';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { NativeBaseProvider, VStack, Text, useToken } from 'native-base';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import { MyIcon } from 'components/MyIcon';
import { TextIn } from 'components/TextIn';
import { Trace } from '../models/Trace';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const PolicyInquiryPage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);

  const [idCard, setIdCard] = useState('');
  const [reason, setReason] = useState('');
  const [userName, setUserName] = useState('');
  const { token } = UserStore();
  const [trace, setTrace] = useState(new Trace('', '', ''));
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  async function PolicyInquiry() {
    trace.province = province;
    trace.city = city;
    trace.county = county;
    setTrace(trace);
    try {
      const response = await send(APIUrl, new PolicyQueryMessage(trace));
      if (response.status !== 0) throw new Error(response.message);
      setMessage(response.message);
      //setGlobalUserName(userName);
      //navigation.navigate('Applets');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="政策查询" />
      <View style={styles.container}>
        <VStack space={1} alignItems="center">
          <Text
            bold
            italic
            underline
            highlight
            _dark={{
              color: 'coolgray.800',
            }}
          >
            请输入需要查询的地点，政策为官方网站最新发布的为准。
          </Text>
        </VStack>
        <TextIn
          text={province}
          setText={setProvince}
          text2={'省/直辖市/自治区/特别行政区'}
          type="text"
        />
        <TextIn
          text={city}
          setText={setCity}
          text2={'市/区/盟/自治州'}
          type="text"
        />
        <TextIn
          text={county}
          setText={setCounty}
          text2={'区/县/街道/旗/自治县'}
          type="text"
        />
        {message ? (
          <Text>目标地区政策： {message}</Text>
        ) : (
          <Text>暂无信息，请尝试在官方网站查找政策信息。</Text>
        )}
        <Pressable onPress={PolicyInquiry} style={baseStyle.button}>
          <Text>查询</Text>
        </Pressable>
        <MyIcon text="返回" navi="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
