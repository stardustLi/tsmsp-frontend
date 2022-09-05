import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalNavigation } from 'utils/navigation';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NucleicAcidPointTable } from 'components/NucleicAcidPointTable';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { GetAllNucleicAcidTestPointMessage } from 'models/messages/acid/GetAllNucleicAcidTestPointMessage';
import { RawNucleicAcidPoint, NucleicAcidPoint } from 'models/NucleicAcidPoint';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const GetNucleicAcidPointPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { userName, idCard, token } = UserStore();

  const [NucleicAcidPointList, setNucleicAcidPointList] = useState<NucleicAcidPoint[]>([]);

  async function fetchNucleicAcidPoint() {
    try {
      const acids: RawNucleicAcidPoint[] = await send(
        new GetAllNucleicAcidTestPointMessage()
      );
      setNucleicAcidPointList(
        acids.map(
          ({ testPlace}) =>
            new NucleicAcidPoint(testPlace)
        )
      );
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchNucleicAcidPoint();
  }, []);

  return (
    <>
      <Header content={`核酸检测点`} />
      <View style={styles.container}>
        <NucleicAcidPointTable data={NucleicAcidPointList} />
        <Button text="返回" onPress={() => navigation.navigate('Applets')} />
        <StatusBar style="auto" />
      </View>
    </>
  );
};
