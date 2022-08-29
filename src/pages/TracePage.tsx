import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Header } from 'components/Header';
import { TraceTable } from 'components/TraceTable';
import { UserStore } from 'libs/UserStore';
import { UserGetTraceMessage } from 'models/messages/UserGetTraceMessage';
import type { Trace } from 'models/trace';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { ScreenProps } from '../../App';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const TracePage: React.FC<ScreenProps> = ({ navigation }) => {
  const [traceHistory, setTraceHistory] = useState<Trace[]>([]);

  const { userName, token } = UserStore();

  async function fetchTrace() {
    try {
      const traces: { trace: string; time: number }[] = await send(
        new UserGetTraceMessage(
          token,
          new Date().getTime() - 86400e3,
          new Date().getTime()
        )
      );
      setTraceHistory(
        traces.map(
          ({ trace, time: timestamp }) => ({
            trace,
            time: new Date(timestamp),
          })
        )
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
