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

export const PolicyShowPage: React.FC<ScreenProps> = ({ navigation }) => {
  setGlobalNavigation(navigation);

  const [idCard, setIdCard] = useState('');
  const [reason, setReason] = useState('');
  const [userName, setUserName] = useState('');
  const { token } = UserStore();
  const [trace, setTrace] = useState(new Trace('', '', ''));
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  async function PolicyInquiry() {
    try {
      await send(APIUrl, new PolicyQueryMessage(trace));
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

        <Pressable onPress={PolicyInquiry} style={baseStyle.button}>
          <Text>查询</Text>
        </Pressable>
        <MyIcon text="返回" navi="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
