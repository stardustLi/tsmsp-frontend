import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Stack } from 'native-base';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { StandardPCCLevels, TraceSelect } from 'components/TraceSelect';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { Select } from 'components/ui/Select';
import { UserStore } from 'libs/UserStore';
import { SetDangerousPlaceMessage } from 'models/api/code/SetDangerousPlaceMessage';
import { RiskLevel } from 'models/enums/RiskLevel';
import { TraceID } from 'models/fields';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const DangerousPlaceSetPage: React.FC = () => {
  const { token } = UserStore();

  const [place, setPlace] = useState<TraceID>(-1);
  const [riskLevel, setRiskLevel] = useState(RiskLevel.LOW);

  async function setDangerousPlace() {
    if (place < 0) return;
    try {
      await send(new SetDangerousPlaceMessage(token, place, riskLevel));
      Alert.alert('设置成功！');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="风险地区设置" />
      <View style={styles.container}>
        <ScrollView>
          <Stack minHeight={120}></Stack>
          <TraceSelect
            trace={place}
            setTrace={setPlace}
            levels={StandardPCCLevels}
          />
          <Text>风险程度</Text>
          <Select
            value={riskLevel.toString()}
            setValue={(newValue) => setRiskLevel(Number(newValue))}
            placeholder="风险程度"
            items={[
              {
                label: '低风险',
                value: RiskLevel.LOW.toString(),
              },
              {
                label: '中风险',
                value: RiskLevel.MEDIUM.toString(),
              },
              {
                label: '高风险',
                value: RiskLevel.HIGH.toString(),
              },
            ]}
          />
          <Button text="设置" onPress={setDangerousPlace} />
          <NavigableButton text="返回" route="Admin" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.LOGIN} />
    </NativeBaseProvider>
  );
};
