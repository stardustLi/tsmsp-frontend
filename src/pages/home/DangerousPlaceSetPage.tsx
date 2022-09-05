import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { Select, SelectItem } from 'components/ui/Select';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { GetPlaceSubordinatesMessage } from 'models/messages/trace/common/GetPlaceSubordinatesMessage';
import { DangerousPlaceSetMessage } from 'models/messages/dangerousPlace/DangerousPlaceSetMessage';
import { NativeBaseProvider, Stack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import {RiskLevel} from "../../models/RiskLevel";

interface RawSubordinate {
  id: number;
  name: string;
  level: number;
}


const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const DangerousPlaceSetPage: React.FC = () => {
  const {idCard, token} = UserStore();
  const [province, setProvince] = useState('');
  const [provinceList, setProvinceList] = useState<SelectItem[]>([]);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState<SelectItem[]>([]);
  const [county, setCounty] = useState('');
  const [countyList, setCountyList] = useState<SelectItem[]>([]);
  const [riskLevel, setRiskLevel] = useState(RiskLevel.LOW);
  const [riskLevelList, setRiskLevelList] = useState<SelectItem[]>([]);

  async function DangerousPlaceSet() {
    try {
      await send(new DangerousPlaceSetMessage(token, Number(county), riskLevel));
      Alert.alert('设置成功！');
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
      <Header content="风险地区设置" />
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
          <Button text="设置" onPress={DangerousPlaceSet} />
          <NavigableButton text="返回" route="Admin" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.LOGIN} />
    </NativeBaseProvider>
  );
};
