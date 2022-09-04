import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { QueryWaitingPersonMessage } from 'models/messages/acid/QueryWaitingPersonMessage';
import { Trace } from 'models/Trace';
import { DetailedTrace } from 'models/DetailedTrace';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const QueryWaitingPersonPage: React.FC = () => {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [street, setstreet] = useState('');
  const [message, setMessage] = useState<number | null>(null);

  async function DangerousPlaceSet() {
    try {
      /*
      const response = await send(
        new QueryWaitingPersonMessage(new DetailedTrace(new Trace(province, city, county), street))
      );*/
      /*setMessage(response);*/
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="排队人数查询" />
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
            请输入查询的核酸检测点地址。
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
        <TextInput
          text={street}
          setText={setstreet}
          label={'街道'}
          type={'text'}
        />
        {message ? (
          <Text>该核酸检测点目前排队人数：{message}</Text>
        ) : (
          <Text>查询失败，请检查输入的地址是否有误</Text>
        )}
        <Button
          text="查询"
          onPress={DangerousPlaceSet}
          style={baseStyle.button}
        />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
