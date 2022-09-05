import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalNavigation } from 'utils/navigation';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { VaccineTable } from 'components/VaccineTable';
import { UserStore } from 'libs/UserStore';
import { UserGetVaccineMessage } from 'models/api/vaccine/UserGetVaccineMessage';
import { RawUserVaccine, UserVaccine } from 'models/UserVaccine';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const ShowVaccinePage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { userName, idCard, token } = UserStore();

  const [vaccineHistory, setVaccineHistory] = useState<UserVaccine[]>([]);

  async function fetchVaccine() {
    try {
      const vaccines: RawUserVaccine[] = await send(
        new UserGetVaccineMessage(token, idCard)
      );
      setVaccineHistory(
        vaccines.map(
          ({ manufacture, time: timestamp, vaccineType }) =>
            new UserVaccine(manufacture, timestamp, vaccineType)
        )
      );
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchVaccine();
  }, []);

  return (
    <>
      <Header content={`${userName} 的疫苗接种记录`} />
      <View style={styles.container}>
        <VaccineTable data={vaccineHistory} />
        <Button text="返回" onPress={() => navigation.navigate('Applets')} />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
