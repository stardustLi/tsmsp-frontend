import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { TraceTable } from 'components/TraceTable';
import { UserStore } from 'libs/UserStore';
import { UserGetTraceWithPeopleMessage } from 'models/api/trace/withPeople/UserGetTraceWithPeopleMessage';
import type { UserTrace } from 'models/UserTrace';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const TraceWithPeoplePage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { userName, token } = UserStore();

  const [traceHistory, setTraceHistory] = useState<UserTrace[]>([]);

  async function fetchTrace() {
    try {
      const response = await send(
        new UserGetTraceWithPeopleMessage(
          token,
          new Date().getTime() - 86400e3,
          new Date().getTime()
        )
      );
      setTraceHistory(
        response.map(
          ({ trace, time: timestamp }: { trace: string; time: number }) => ({
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
      <Header content={`和 ${userName} 贴贴过的人`} />
      <View style={styles.container}>
        <TraceTable data={traceHistory} />
        <Button text="返回" onPress={() => navigation.navigate('Home')} />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
