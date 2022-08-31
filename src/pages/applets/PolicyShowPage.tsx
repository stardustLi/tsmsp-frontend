import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { NavigableButton } from 'components/NavigableButton';
import { TextInput } from 'components/TextInput';
import { StatusBar } from 'expo-status-bar';
import { PolicyQueryMessage } from 'models/messages/PolicyQueryMessage';
import { Trace } from 'models/Trace';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const PolicyShowPage: React.FC = () => {
  const [trace /* setTrace */] = useState<Trace>(new Trace('', '', ''));
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  async function PolicyInquiry() {
    try {
      await send(new PolicyQueryMessage(trace));
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
        <Button text="查询" onPress={PolicyInquiry} />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
