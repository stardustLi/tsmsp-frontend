import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Stack } from 'native-base';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { StandardPCCLevels, TraceSelect } from 'components/TraceSelect';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import { UserAddTraceMessage } from 'models/api/trace/common/UserAddTraceMessage';
import { TraceID } from 'models/fields';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const AddTracePage: React.FC = () => {
  const { idCard, token } = UserStore();

  const [trace, setTrace] = useState<TraceID>(-1);

  async function addTrace() {
    if (trace < 0) return; // TODO: 返回未选择
    try {
      await send(new UserAddTraceMessage(token, idCard, trace));
      Alert.alert('提交成功！');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="手动登记轨迹" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <Stack minHeight={120}></Stack>
          <TraceSelect
            trace={trace}
            setTrace={setTrace}
            levels={StandardPCCLevels}
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
