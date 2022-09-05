import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { Select, SelectItem } from 'components/ui/Select';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { GetPlaceSubordinatesMessage } from 'models/messages/trace/common/GetPlaceSubordinatesMessage';
import { PolicyQueryMessage } from 'models/messages/policy/PolicyQueryMessage';
import { Trace } from 'models/Trace';
import { NativeBaseProvider, Stack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

interface RawSubordinate {
  id: number;
  name: string;
  level: number;
}


const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const PolicyInquiryPage: React.FC = () => {
  const [province, setProvince] = useState('');
  const [provinceList, setProvinceList] = useState<SelectItem[]>([]);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState<SelectItem[]>([]);
  const [county, setCounty] = useState('');
  const [countyList, setCountyList] = useState<SelectItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  async function PolicyInquiry() {
    try {
      await send(new PolicyQueryMessage(Number(county)));
    } catch (e) {
      console.error(e);
    }
  }

  async function getSubordinate(
      value: number,
      callback: (value: SelectItem[]) => void
  ) {
    try {
      const response: RawSubordinate[] = await send(
          new GetPlaceSubordinatesMessage(value)
      );
      callback(
          response.map(({ id, name }) => ({ label: name, value: id.toString() }))
      );
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getSubordinate(0, setProvinceList);
  }, []);
  useEffect(() => {
    getSubordinate(Number(province), setCityList);
  }, [province]);
  useEffect(() => {
    getSubordinate(Number(city), setCountyList);
  }, [city]);

  return (
    <NativeBaseProvider>
      <Header content="政策查询" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <Stack minHeight={120}></Stack>
          <Text>省/直辖市/自治区/特别行政区</Text>
          <Select
              value={province}
              setValue={setProvince}
              placeholder="省/直辖市/自治区/特别行政区"
              items={provinceList}
          />
          <Text>市/区/盟/自治州</Text>
          <Select
              value={city}
              setValue={setCity}
              placeholder="市/区/盟/自治州"
              items={cityList}
          />
          <Text>区/县/街道/旗/自治县</Text>
          <Select
              value={county}
              setValue={setCounty}
              placeholder="区/县/街道/旗/自治县"
              items={countyList}
          />
        {message ? (
          <Text>目标地区政策： {message}</Text>
        ) : (
          <Text>暂无信息，请尝试在官方网站查找政策信息。</Text>
        )}
        <Button text="查询" onPress={PolicyInquiry} style={baseStyle.button} />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </ScrollView>
      </View>
      <BottomBar tab={BottomTab.LOGIN} />
    </NativeBaseProvider>
  );
};
