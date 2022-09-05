import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Stack } from 'native-base';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import {
  StandardPCCLevelsWithStreet,
  TraceSelect
} from 'components/TraceSelect';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { UserStore } from 'libs/UserStore';
import { AddNucleicAcidTestPointMessage } from 'models/api/nucleicAcidTest/AddNucleicAcidTestPointMessage';
import { TraceID } from 'models/fields';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const AddNucleicAcidTestPointPage: React.FC = () => {
  const { token } = UserStore();

  const [place, setPlace] = useState<TraceID>(-1);
  const [name, setName] = useState('');

  async function addNucleicAcidTestPoint() {
    if (place < 0) return;
    try {
      await send(new AddNucleicAcidTestPointMessage(token, place, name));
      Alert.alert('提交成功！');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="添加核酸检测点" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <Stack minHeight={120}></Stack>
          <TraceSelect
            trace={place}
            setTrace={setPlace}
            levels={StandardPCCLevelsWithStreet}
          />
          <TextInput
            text={name}
            setText={setName}
            label="检测点名称"
            type="text"
          />
          <Button text="提交核酸检测点" onPress={addNucleicAcidTestPoint} />
          <NavigableButton text="返回" route="Home" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.LOGIN} />
    </NativeBaseProvider>
  );
};
