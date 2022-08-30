import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Header } from 'components/Header';
import { TraceTable } from 'components/TraceTable';
import { UserStore } from 'libs/UserStore';
import { UserGetTraceWithPeopleMessage } from 'models/messages/UserGetTraceWithPeopleMessage';
import type { UserTrace } from 'models/UserTrace';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { ScreenProps } from 'utils/navigation';

const styles = StyleSheet.create({
  container: baseStyle.container,
  //button: baseStyle.button,
});

export const TraceWithPeoplePage: React.FC<ScreenProps> = ({ navigation }) => {
  const [traceHistory, setTraceHistory] = useState<UserTrace[]>([]);

  const { userName, token } = UserStore();

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
      <Header content={`和${userName} 贴贴过的人`} />
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
