import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { Select, SelectItem } from 'components/ui/Select';
import { TextInput } from 'components/ui/TextInput';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { GetPlaceSubordinatesMessage } from 'models/messages/trace/common/GetPlaceSubordinatesMessage';
import { UserAddTraceMessage } from 'models/messages/trace/common/UserAddTraceMessage';
import { Trace } from 'models/Trace';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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

export const AddTracePage: React.FC = () => {
  const { idCard, token } = UserStore();

  const [province, setProvince] = useState('');
  const [provinceList, setProvinceList] = useState<SelectItem[]>([]);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState<SelectItem[]>([]);
  const [county, setCounty] = useState('');
  const [countyList, setCountyList] = useState<SelectItem[]>([]);

  async function addTrace() {
    try {
      await send(new UserAddTraceMessage(token, idCard, Number(county)));
    } catch (e) {
      console.error(e);
    }
  }

  async function getSubordinate(value: number, callback: (value: SelectItem[]) => void) {
    try {
      const response: RawSubordinate[] = await send(new GetPlaceSubordinatesMessage(value));
      callback(response.map(({ id, name }) => ({ label: name, value: id.toString() })));
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => { getSubordinate(0, setProvinceList); }, []);
  useEffect(() => { getSubordinate(Number(province), setCityList); }, [province]);
  useEffect(() => { getSubordinate(Number(city), setCountyList); }, [city]);

  return (
    <NativeBaseProvider>
      <Header content="手动登记轨迹" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <Text>省/直辖市/自治区/特别行政区</Text>
          <Select
            value={province}
            setValue={setProvince}
            placeholder="省/直辖市/自治区/特别行政区"
            items={provinceList}
          />
          <Select
            value={city}
            setValue={setCity}
            placeholder="市/区/盟/自治州"
            items={cityList}
          />
          <Select
            value={county}
            setValue={setCounty}
            placeholder="区/县/街道/旗/自治县"
            items={countyList}
          />
          <Button text="提交轨迹" onPress={addTrace} />
          <NavigableButton text="返回" route="Home" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.LOGIN} />
    </NativeBaseProvider>
  );
};
