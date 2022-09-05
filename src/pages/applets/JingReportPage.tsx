import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { UserStore } from 'libs/UserStore';
import { JingReportMessage } from 'models/api/code/JingReportMessage';
import { alertBox } from 'utils/alert';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const JingReportPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { token } = UserStore();

  const [idCard, setIdCard] = useState('');
  const [reason, setReason] = useState('');
  const [userName, setUserName] = useState('');
  const [checkedFirst, setCheckedFirst] = useState(false);
  const [checkedSecond, setCheckedSecond] = useState(false);

  async function JingReport() {
    if (checkedFirst && checkedSecond) {
      try {
        await send(new JingReportMessage(token, idCard, reason));
        navigation.navigate('Applets');
      } catch (e) {
        console.error(e);
      }
    } else {
      alertBox('请确认已勾选承诺！');
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="进京报备" />
      <View style={styles.container}>
        <Text bold italic underline highlight>
          报备前请确认您十四日内未经过至少一例阳性病例所在市/(直辖市)区,本人及密切接触者无发烧、咳嗽、感冒等症状,符合疫情防控相关法律法规。
        </Text>
        <TextInput
          text={userName}
          setText={setUserName}
          label="用户名"
          type="text"
        />
        <TextInput
          text={idCard}
          setText={setIdCard}
          label="身份证号"
          type="text"
        />
        <TextInput
          text={reason}
          setText={setReason}
          label="进京理由简述"
          type="text"
          width="300"
        />
        <Checkbox
          message="我承诺14日内未途径中高风险区所在市"
          checked={checkedFirst}
          handleChange={setCheckedFirst}
        />
        <Checkbox
          message="我承诺本人和同行者无感冒、头痛、发烧、不想写代码等症状"
          checked={checkedSecond}
          handleChange={setCheckedSecond}
        />
        <Button text="提交" onPress={JingReport} />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
