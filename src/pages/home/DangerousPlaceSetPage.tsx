import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { SetDangerousPlaceMessage } from 'models/api/code/SetDangerousPlaceMessage';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { UserStore } from 'libs/UserStore';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const DangerousPlaceSetPage: React.FC = () => {
  const { token } = UserStore();

  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [riskLevel, setRiskLevel] = useState(0);
  const [message, setMessage] = useState<string | null>('1');

  async function DangerousPlaceSet() {
    try {
      const response = await send(
        new SetDangerousPlaceMessage(token, Number(county), riskLevel)
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
          <Text bold italic underline highlight>
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
          <Text>设置失败，请检查地名及风险等级是否有误。</Text>
          // 此行只应在设置失败时出现，目前有 Bug，在 PolicyInquiryPage 中同样如此
        )}
        <Button
          text="设置"
          onPress={DangerousPlaceSet}
          style={baseStyle.button}
        />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
