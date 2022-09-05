import { StatusBar } from 'expo-status-bar';
import {NativeBaseProvider, Stack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { QueryTestPointWaitingPersonMessage } from 'models/messages/acid/QueryTestPointWaitingPersonMessage';
import { Trace } from 'models/Trace';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import {Select, SelectItem} from "../../components/ui/Select";
import {GetPlaceSubordinatesMessage} from "../../models/messages/trace/common/GetPlaceSubordinatesMessage";
import {BottomBar, BottomTab} from "../../components/BottomBar";

interface RawSubordinate {
  id: number;
  name: string;
  level: number;
}

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const QueryWaitingPersonPage: React.FC = () => {
  const [province, setProvince] = useState('');
  const [provinceList, setProvinceList] = useState<SelectItem[]>([]);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState<SelectItem[]>([]);
  const [county, setCounty] = useState('');
  const [countyList, setCountyList] = useState<SelectItem[]>([]);
  const [pointName, setPointName] = useState('');
  const [pointNameList, setPointNameList] = useState<SelectItem[]>([]);//暂未实现由county查找pointName的功能
  const [message, setMessage] = useState<number | null>(null);

  async function QueryWaitingPerson() {
    try {await send(new QueryTestPointWaitingPersonMessage(pointName));
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
      <Header content="排队人数查询" />
      <View style={styles.container}>
        <ScrollView>
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
          <Text>检测点名称</Text>
          <Select
              value={pointName}
              setValue={setPointName}
              placeholder="检测点名称"
              items={pointNameList}
          />
          {message ? (
              <Text>该检测点等候人数： {message}</Text>
          ) : (
              <Text>暂无信息，请稍后再试。</Text>
          )}
          <Button text="查询" onPress={QueryWaitingPerson} />
          <NavigableButton text="返回" route="Home" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.LOGIN} />
    </NativeBaseProvider>
  );
};
