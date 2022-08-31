import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { NavigableButton } from 'components/NavigableButton';
import { Select } from 'components/Select';
import { TextInput } from 'components/TextInput';
import { TextInputRow } from 'components/TextInputRow';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { UserAddVaccineMessage } from 'models/messages/UserAddVaccineMessage';
import { NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const AddVaccinePage: React.FC = () => {
  const navigation = globalNavigation()!;
  const [manufacture, setManufacture] = useState('');
  const { token } = UserStore();

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  async function Appeal() {
    try {
      const time = new Date(Number(year), Number(month) - 1, Number(day));
      if (Number.isNaN(time.getTime())) {
        throw new TypeError('你被猫猫抓走了');
      }

      await send(new UserAddVaccineMessage(token, manufacture, time.getTime()));
      navigation.navigate('Applets');
    } catch (e) {
      console.error(e);
    }
  }
  // userToken: string,
  // idCard: IDCard,
  // manufacture: string,
  // now: Date,
  // vaccineType: number
  // manufacture: String, now: DateTime, vaccineType
  return (
    <NativeBaseProvider>
      <Header content="增加疫苗记录" />
      <View style={styles.container}>
        <TextInput
          text={manufacture}
          setText={setManufacture}
          label="疫苗生产机构"
          type="text"
        />
        <Select
          value={year}
          setValue={setYear}
          placeholder="年"
          items={[{
            label: '猫猫',
            value: '真猫'
          }]}
        />
        <TextInputRow
          width={90}
          inputs={[
            {
              text: year,
              setText: setYear,
              placeholder: '年',
            },
            {
              text: month,
              setText: setMonth,
              placeholder: '月',
            },
            {
              text: day,
              setText: setDay,
              placeholder: '日',
            },
          ]}
        />
        {/* <TextInput
          text={reason}
          setText={setReason}
          label="申请理由简述"
          type="text"
          width="300"
        /> */}
        <Button text="提交" onPress={Appeal} style={baseStyle.button} />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};