import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import {
  StandardPCCLevelsWithStreet,
  TraceSelect,
} from 'components/TraceSelect';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { Select } from 'components/ui/Select';
import { GetAllNucleicAcidTestPointMessage } from 'models/api/nucleicAcidTest/GetAllNucleicAcidTestPointMessage';
import { QueryTestPointWaitingPersonMessage } from 'models/api/nucleicAcidTest/QueryTestPointWaitingPersonMessage';
import type { NucleicAcidTestPointName, TraceID } from 'models/fields';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const QueryWaitingPersonPage: React.FC = () => {
  const [trace, setTrace] = useState<TraceID>(-1);
  const [pointName, setPointName] = useState('');
  const [pointNameList, setPointNameList] = useState<string[]>([]);
  const [count, setCount] = useState<number | null>(null);

  async function queryWaitingPerson() {
    try {
      setCount(await send(new QueryTestPointWaitingPersonMessage(pointName)));
    } catch (e) {
      console.error(e);
    }
  }

  async function getAllNucleicAcidTestPoints(
    value: TraceID
  ): Promise<{ place: TraceID; name: NucleicAcidTestPointName }[]> {
    if (value < 0) return [];
    try {
      return await send(new GetAllNucleicAcidTestPointMessage(value));
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  useEffect(() => {
    getAllNucleicAcidTestPoints(trace).then((pointNameList) => {
      setPointNameList(pointNameList.map((pointName) => pointName.name));
    });
  }, [trace]);

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
        <TraceSelect
          trace={trace}
          setTrace={setTrace}
          levels={StandardPCCLevelsWithStreet}
        />
        <Text>检测点名称</Text>
        <Select
          value={pointName}
          setValue={setPointName}
          placeholder="检测点名称"
          items={pointNameList.map((name) => ({ label: name, value: name }))}
        />
        {count ? (
          <Text>该核酸检测点目前排队人数：{count}</Text>
        ) : (
          <Text>查询失败，请检查输入的地址是否有误</Text>
        )}
        <Button
          text="查询"
          onPress={queryWaitingPerson}
          style={baseStyle.button}
        />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.APPLETS} />
    </NativeBaseProvider>
  );
};
