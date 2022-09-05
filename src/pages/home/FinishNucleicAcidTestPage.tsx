import { NativeBaseProvider, Stack } from 'native-base';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { Select, SelectItem } from 'components/ui/Select';
import { TextInput } from 'components/ui/TextInput';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { FinishNucleicAcidTestMessage } from 'models/api/nucleicAcidTest/FinishNucleicAcidTestMessage';
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
  const [result, setResult] = useState(false);

  async function finishNucleicAcidTest() {
    try {
      await send(
          new FinishNucleicAcidTestMessage(token, idCard, testPlace, result)
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
            <Text>受检者身份证号</Text>
            <TextInput
                text={idCard}
                setText={setIdCard}
                label="受检者身份证号"
                type="text"
            />
            <Text>检测点名称</Text>
            <TextInput
                text={testPlace}
                setText={setTestPlace}
                label="检测点名称"
                type="text"
            />
            <Text>检测结果</Text>
            <Select
                value={result.toString()}
                setValue={(newValue) => setResult(Boolean(newValue))}
                placeholder="检测结果"
                items={[
                  {
                    label: '阴性',
                    value: false.toString(),
                  },
                  {
                    label: '阳性',
                    value: true.toString(),
                  },
                ]}
            />
            <Button text="提交核酸检测结果" onPress={finishNucleicAcidTest} />
            <NavigableButton text="返回" route="Admin" />
            <StatusBar style="auto" />
          </ScrollView>
        </View>
        <BottomBar tab={BottomTab.APPLETS} />
      </NativeBaseProvider>
  );
};
