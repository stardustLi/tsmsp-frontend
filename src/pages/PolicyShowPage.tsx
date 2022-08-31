import { Header } from 'components/Header';
import { MyIcon } from 'components/MyIcon';
import { TextIn } from 'components/TextIn';
import { StatusBar } from 'expo-status-bar';
import { PolicyQueryMessage } from 'models/messages/PolicyQueryMessage';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { Trace } from '../models/Trace';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const PolicyShowPage: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setGlobalNavigation(navigation);
  }, []);

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
