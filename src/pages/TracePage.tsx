import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Header } from 'components/Header';
import { TraceTable } from 'components/TraceTable';
import { UserStore } from 'libs/UserStore';
import { UserGetTraceMessage } from 'models/messages/UserGetTraceMessage';
import { Trace } from 'models/Trace';
import type { UserTrace } from 'models/UserTrace';
import { ScreenProps } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const TracePage: React.FC<ScreenProps> = ({ navigation }) => {
  const [traceHistory, setTraceHistory] = useState<UserTrace[]>([]);

  const { userName, idCard, token } = UserStore();

  async function fetchTrace() {
    try {
      const traces: { trace: Trace; time: number }[] = await send(
        new UserGetTraceMessage(
          token,
          idCard,
          new Date().getTime() - 86400e3,
          new Date().getTime()
        )
      );
      setTraceHistory(
        traces.map(({ trace, time: timestamp }) => ({
          trace,
          time: new Date(timestamp),
        }))
      );
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchTrace();
  }, []);

  return (
    <>
      <Header content={`${userName} 的行程记录`} />
      <View style={styles.container}>
        <TraceTable data={traceHistory} />
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={baseStyle.button}
        >
          <Text>返回</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </>
  );
};
