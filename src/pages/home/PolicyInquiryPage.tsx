import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { PolicyQueryMessage } from 'models/messages/policy/PolicyQueryMessage';
import { Trace } from 'models/Trace';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const PolicyInquiryPage: React.FC = () => {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  async function PolicyInquiry() {
    try {
      /*(const response = await send(
        new PolicyQueryMessage(new Trace(province, city, county))
      );
      setMessage(response);*/
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
        <TextInput
          text={province}
          setText={setProvince}
          label="省/直辖市/自治区/特别行政区"
          type="text"
        />
        <TextInput
          text={city}
          setText={setCity}
          label="市/区/盟/自治州"
          type="text"
        />
        <TextInput
          text={county}
          setText={setCounty}
          label="区/县/街道/旗/自治县"
          type="text"
        />
        {message ? (
          <Text>目标地区政策： {message}</Text>
        ) : (
          <Text>暂无信息，请尝试在官方网站查找政策信息。</Text>
        )}
        <Button text="查询" onPress={PolicyInquiry} style={baseStyle.button} />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
