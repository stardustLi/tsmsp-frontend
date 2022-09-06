import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { TraceTable } from 'components/TraceTable';
import { UserStore } from 'libs/UserStore';
import { UserGetTraceMessage } from 'models/api/trace/common/UserGetTraceMessage';
import { RawUserTrace, UserTrace } from 'models/UserTrace';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const TracePage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { userName, idCard, token } = UserStore();

  const [traceHistory, setTraceHistory] = useState<UserTrace[]>([]);

  async function fetchTrace() {
    try {
      const traces: RawUserTrace[] = await send(
        new UserGetTraceMessage(
          token,
          idCard,
          new Date().getTime() - 86400e3,
          new Date().getTime()
        )
      );
      console.log(traces);
      setTraceHistory(
        traces
          .map(({ trace, time: timestamp }) => new UserTrace(trace, timestamp))
          .reverse()
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
        <Button text="返回" onPress={() => navigation.navigate('Home')} />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
