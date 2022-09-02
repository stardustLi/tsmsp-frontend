import { StatusBar } from 'expo-status-bar';
import {NativeBaseProvider, Text, VStack} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { DangerousPlaceSetMessage } from 'models/messages/dangerousPlace/DangerousPlaceSetMessage';
import { Trace } from 'models/Trace';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

//risklevel类型与后端的对应尚未实现，暂时以Number类型存储，Number类型的输入暂未实现

export const DangerousPlaceSetPage: React.FC = () => {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [riskLevel, setRiskLevel] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  async function DangerousPlaceSet() {
    try {
      const response = await send(
        new DangerousPlaceSetMessage(new Trace(province, city, county), riskLevel)
      );
      setMessage(response);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="风险地区设置" />
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
            请输入需要设置的风险地区以及风险等级。
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
          <Text>风险地区设置成功。</Text>
        ) : (
          <Text>设置失败，请检查地名及风险等级是否有误。</Text>//此行只应在设置失败时出现，目前有Bug，在PolicyInquiryPage中同样如此
        )}
        <Button text="设置" onPress={DangerousPlaceSet} style={baseStyle.button} />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
