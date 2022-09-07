import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Stack } from 'native-base';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { MyQRCode } from 'components/MyQRCode';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { UserStore } from 'libs/UserStore';
import { UserGetColorMessage } from 'models/api/code/UserGetColorMessage';
import { CodeColor } from 'models/enums/CodeColor';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const OtherCodePage: React.FC = () => {
  const { token } = UserStore();
  const [otherIdcard, setOtherIdcard] = useState('');
  const [quiry, setQuiry] = useState(Boolean);
  const [codeColor, setCodeColor] = useState<number | null>(null);

  async function getOtherCode() {
    try {
      const response = await send(new UserGetColorMessage(token, otherIdcard));
      setQuiry(true);
      setCodeColor(response);
    } catch (e) {
      if (e instanceof Error && e.message.includes('无权限访问 (或不存在)')) {
        Alert.alert('您没有权限访问该用户的健康码！');
      } else {
        console.error(e);
      }
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="健康码代查" />
      <View style={styles.container}>
        <View style={{ marginBottom: 14 }}>
          {quiry ? (
            <MyQRCode
              color={CodeColor[Number(codeColor ? codeColor : 0)].toLowerCase()}
            />
          ) : (
            <Stack minHeight={100}></Stack>
          )}
        </View>
        <TextInput
          text={otherIdcard}
          setText={setOtherIdcard}
          label="被查询者的身份证号"
          type={undefined}
        />
        <Button text="查询" onPress={getOtherCode} />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.HOME} />
    </NativeBaseProvider>
  );
};
