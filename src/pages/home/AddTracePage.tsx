import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'components/ui/Button';
import { UserStore } from 'libs/UserStore';
import { UserAddTraceMessage } from 'models/messages/trace/common/UserAddTraceMessage';
import { Trace } from 'models/Trace';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { NativeBaseProvider } from 'native-base';
import { TextInput } from 'components/ui/TextInput';
import { NavigableButton } from 'components/ui/NavigableButton';
import { BottomBar, BottomTab } from 'components/BottomBar';
import { Header } from 'components/ui/Header';

const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const AddTracePage: React.FC = () => {
  const navigation = globalNavigation()!;
  const { idCard, token } = UserStore();
  const [newTrace, setNewTrace] = useState<Trace | null>(null);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const { userName,admin } = UserStore();
  async function addTrace() {
    try {
      await send(new UserAddTraceMessage(token, idCard, new Trace(province, city, county)!));
    } catch (e) {
      console.error(e);
    }
  }

  return (
  <NativeBaseProvider>
    <Header content="手动登记轨迹" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <TextInput
            text={province}
            setText={setProvince}
            label="省/直辖市/自治区/特别行政区"
            type="text"
          />
          <TextInput
            text={city}
            setText={setCity}
            label="市/区/盟/自治州"
            type="text"
          />
          <TextInput
            text={county}
            setText={setCounty}
            label="区/县/街道/旗/自治县"
            type="text"
          />
          <Button text="提交轨迹" onPress={addTrace} />
          <NavigableButton text="返回" route="Home" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
    <BottomBar tab={BottomTab.LOGIN} />
  </NativeBaseProvider>
  );
};
