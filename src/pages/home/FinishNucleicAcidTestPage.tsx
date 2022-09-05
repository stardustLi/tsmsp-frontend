import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { Select, SelectItem } from 'components/ui/Select';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { FinishNucleicAcidTestMessage } from 'models/messages/acid/FinishNucleicAcidTestMessage';
import { NativeBaseProvider, Stack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput } from 'components/ui/TextInput';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const FinishNucleicAcidTestPage: React.FC = () => {
  const { token } = UserStore();
  const [idCard, setIdCard] = useState('');
  const [testPlace, setTestPlace] = useState('');
  const [result, setResult] = useState('');
  const [resultList, setResultList] = useState<SelectItem[]>([]);//not finished

  async function finishNucleicAcidTest() {
    try {
      await send(
        new FinishNucleicAcidTestMessage(token, idCard, testPlace, false)//to be changed
      );
      Alert.alert('提交成功！');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="添加核酸检测结果" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <Stack minHeight={120}></Stack>
          <Text>省/直辖市/自治区/特别行政区</Text>
          <TextInput
              text={idCard}
              setText={setIdCard}
              label="受检者身份证号"
              type="text"
          />
          <Text>市/区/盟/自治州</Text>
          <TextInput
              text={testPlace}
              setText={setTestPlace}
              label="检测点名称"
              type="text"
          />
          <Text>区/县/街道/旗/自治县</Text>
          <Select
            value={result}
            setValue={setResult}
            placeholder="检测结果"
            items={resultList}
          />
          <Button text="提交核酸检测结果" onPress={finishNucleicAcidTest} />
          <NavigableButton text="返回" route="Admin" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.LOGIN} />
    </NativeBaseProvider>
  );
};
