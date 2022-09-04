import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalNavigation } from 'utils/navigation';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { AcidTable } from 'components/AcidTable';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { GetNucleicAcidTestResultsMessage } from 'models/messages/acid/GetNucleicAcidTestResultsMessage';
import { RawUserAcid, UserAcid } from 'models/UserAcid';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const ShowAcidPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { userName, idCard, token } = UserStore();

  const [acidHistory, setAcidHistory] = useState<UserAcid[]>([]);

  async function fetchAcid() {
    try {
      const acids: RawUserAcid[] = await send(
        new GetNucleicAcidTestResultsMessage(token, idCard)
      );
      setAcidHistory(
        acids.map(
          ({ time: timestamp, testPlace, result }) =>
            new UserAcid(testPlace, timestamp, result)
        )
      );
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchAcid();
  }, []);

  return (
    <>
      <Header content={`${userName} 的核酸记录`} />
      <View style={styles.container}>
        <AcidTable data={acidHistory} />
        <Button text="返回" onPress={() => navigation.navigate('Applets')} />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
