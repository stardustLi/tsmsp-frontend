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
import { NativeBaseProvider, Text } from 'native-base';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { BottomBar, BottomTab } from './BottomBar';
import { NavigableButton } from './ui/NavigableButton';
import { compareSpecificity } from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';
import { TextInput } from 'components/ui/TextInput';

const styles = StyleSheet.create({
  container: baseStyle.container,
  alignCenter: baseStyle.alignCenter,
});

export const AddTrace: React.FC = () => {
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
      <Header content="登录" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <TextInput
            text={province}
            setText={setProvince}
            label="省份"
            type={undefined}
          />
          <TextInput
            text={province}
            setText={setProvince}
            label=""
            type={undefined}
          />
          <TextInput
            text={province}
            setText={setProvince}
            label="省份"
            type={undefined}
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
