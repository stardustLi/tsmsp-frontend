import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { Select } from 'components/ui/Select';
import { TextInput } from 'components/ui/TextInput';
import { UserStore } from 'libs/UserStore';
import { UserAddVaccineMessage } from 'models/api/vaccine/UserAddVaccineMessage';
import { globalNavigation } from 'utils/navigation';
import { generateSelectItems } from 'utils/range';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});
export const AddVaccinePage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { idCard, token } = UserStore();

  const [manufacture, setManufacture] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  async function AddVaccine() {
    if (manufacture){
      if (year && month && day){
        try {
          const time = new Date(Number(year), Number(month) - 1, Number(day));
          if (Number.isNaN(time.getTime())) {
            throw new TypeError('请选择合法的时间！');
          }

          await send(
            new UserAddVaccineMessage(token, idCard, manufacture, time.getTime())
          );
          Alert.alert("提交成功！");
          // navigation.navigate('Applets');
        } catch (e) {
          console.error(e);
        }      
      }
      else {
        Alert.alert("请选择合法的日期！");
      }      
    }
    else {
      Alert.alert("请输入机构名称！");
    }


  }

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
          items={generateSelectItems(2019, 2022, (year) => year.toString())}
        />
        <Select
          value={month}
          setValue={setMonth}
          placeholder="月"
          items={generateSelectItems(1, 12, (month) => `${month} 月`)}
        />
        <Select
          value={day}
          setValue={setDay}
          placeholder="日"
          items={generateSelectItems(1, 31, (day) => `${day} 日`)}
        />
        <Text>{year}</Text>
        <Button text="提交" onPress={AddVaccine} style={baseStyle.button} />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
