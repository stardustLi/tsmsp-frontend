import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalNavigation } from 'utils/navigation';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { AppealTable } from 'components/AppealTable';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { QueryAppealsMessage } from 'models/api/code/appeal/QueryAppealsMessage';
import { RawUserAppeal, UserAppeal } from 'models/UserAppeal';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const ShowAppealPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { token } = UserStore();

  const [appealHistory, setAppealHistory] = useState<UserAppeal[]>([]);

  async function fetchAppeal() {
    try {
      const appeals: RawUserAppeal[] = await send(
        new QueryAppealsMessage(token)
      );
      setAppealHistory(
        appeals
          .map(
            ({ time: timestamp, idCard, reason }) =>
              new UserAppeal(idCard, reason, timestamp)
          )
          .reverse()
      );
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchAppeal();
  }, []);

  return (
    <>
      <Header content={`申诉记录`} />
      <View style={styles.container}>
        <AppealTable data={appealHistory} token={token} />
        <Button text="返回" onPress={() => navigation.navigate('Admin')} />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
