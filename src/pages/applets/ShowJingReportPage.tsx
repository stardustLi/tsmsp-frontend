import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalNavigation } from 'utils/navigation';

import { JingReportTable } from 'components/JingReportTable';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { UserStore } from 'libs/UserStore';
import { QueryJingReportsMessage } from 'models/api/code/QueryJingReportsMessage';
import { RawUserJingReport, UserJingReport } from 'models/UserJingReport';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const ShowJingReportPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { token } = UserStore();

  const [jingReportHistory, setJingReportHistory] = useState<UserJingReport[]>(
    []
  );

  async function fetchJingReport() {
    try {
      const jingReports: RawUserJingReport[] = await send(
        new QueryJingReportsMessage(token)
      );
      setJingReportHistory(
        jingReports
          .map(
            ({ time: timestamp, idCard, reason }) =>
              new UserJingReport(idCard, reason, timestamp)
          )
          .reverse()
      );
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchJingReport();
  }, []);

  return (
    <>
      <Header content={`报备记录`} />
      <View style={styles.container}>
        <JingReportTable data={jingReportHistory} />
        <Button text="返回" onPress={() => navigation.navigate('Admin')} />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
