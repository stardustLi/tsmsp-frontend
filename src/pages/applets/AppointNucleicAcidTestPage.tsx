import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import {
  StandardPCCLevelsWithStreet,
  TraceSelect,
} from 'components/TraceSelect';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { Select } from 'components/ui/Select';
import { UserStore } from 'libs/UserStore';
import { AppointNucleicAcidTestMessage } from 'models/api/nucleicAcidTest/AppointNucleicAcidTestMessage';
import { GetAllNucleicAcidTestPointMessage } from 'models/api/nucleicAcidTest/GetAllNucleicAcidTestPointMessage';
import type { NucleicAcidTestPointName, TraceID } from 'models/fields';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const AppointNucleicAcidTestPage: React.FC = () => {
  const { token, idCard } = UserStore();

  const [trace, setTrace] = useState<TraceID>(-1);
  const [pointName, setPointName] = useState('');
  const [pointNameList, setPointNameList] = useState<string[]>([]);

  async function AppointNucleicAcidTest() {
    try {
      await send(new AppointNucleicAcidTestMessage(token, idCard, pointName));
      Alert.alert('预约成功！');
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
      <Header content="核酸检测预约" />
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
            请输入预约的核酸检测点地址。
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
        <Button
          text="预约检测"
          onPress={AppointNucleicAcidTest}
          style={baseStyle.button}
        />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.APPLETS} />
    </NativeBaseProvider>
  );
};
