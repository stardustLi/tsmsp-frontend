import { NativeBaseProvider, Stack } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { StatusBar } from 'expo-status-bar';
import { PolicyQueryMessage } from 'models/api/policy/PolicyQueryMessage';
import type { TraceID } from 'models/fields';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { TraceSelect, StandardPCCLevels } from 'components/TraceSelect';

const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const PolicyQueryPage: React.FC = () => {
  const [trace, setTrace] = useState<TraceID>(-1);
  const [message, setMessage] = useState('');

  async function policyQuery() {
    if (trace < 0) return;
    try {
      setMessage(await send(new PolicyQueryMessage(trace)));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="政策查询" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <Stack minHeight={120}></Stack>
          <TraceSelect
            trace={trace}
            setTrace={setTrace}
            levels={StandardPCCLevels}
          />
          {message ? (
            <Text>目标地区政策： {message}</Text>
          ) : (
            <Text>暂无信息，请尝试在官方网站查找政策信息。</Text>
          )}
          <Button text="查询" onPress={policyQuery} style={baseStyle.button} />
          <NavigableButton text="返回" route="Applets" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.LOGIN} />
    </NativeBaseProvider>
  );
};
