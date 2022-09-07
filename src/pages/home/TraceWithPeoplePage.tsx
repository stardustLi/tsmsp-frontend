import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { TraceWithPeopleTable } from 'components/TraceWithPeopleTable';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { UserStore } from 'libs/UserStore';
import { UserGetTraceWithPeopleMessage } from 'models/api/trace/withPeople/UserGetTraceWithPeopleMessage';
import { UserTraceWithPeople } from 'models/UserTraceWithPeople';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const TraceWithPeoplePage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { userName, token, idCard } = UserStore();

  const [traceHistory, setTraceHistory] = useState<UserTraceWithPeople[]>([]);

  async function fetchUserTraceWithPeople() {
    try {
      const response = await send(
        new UserGetTraceWithPeopleMessage(
          token,
          idCard,
          new Date().getTime() - 86400e3,
          new Date().getTime()
        )
      );
      setTraceHistory(
        response.map(
          ({
            CCUserName,
            time: timestamp,
          }: {
            CCUserName: string;
            time: number;
          }) => new UserTraceWithPeople(CCUserName, timestamp)
        )
      );
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchUserTraceWithPeople();
  }, []);

  return (
    <>
      <Header content={`和 ${userName} 贴贴过的人`} />
      <View style={styles.container}>
        <TraceWithPeopleTable data={traceHistory} />
        <Button text="返回" onPress={() => navigation.navigate('Home')} />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
