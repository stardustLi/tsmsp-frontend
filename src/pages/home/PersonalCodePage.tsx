import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { CodeColor } from 'models/CodeColor';
import { UserGetColorMessage } from 'models/messages/code/appeal/UserGetColorMessage';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const PersonalCodePage: React.FC = () => {
  const { userName } = UserStore();
  const [now, setNow] = useState(new Date());
  const [minute, setMinute] = useState(new Date());
  const { token, idCard } = UserStore();
  const [codeColor, setCodeColor] = useState<number>();

  useEffect(() => {
    getCodeColor();
  }, []);

  async function getCodeColor() {
    try {
      const response = await send(new UserGetColorMessage(idCard, token));
      setCodeColor(response);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的个人地点码`} />
      <View style={styles.container}>
        <View style={{ marginBottom: 14 }}>
          <QRCode
            color={CodeColor[codeColor ? codeColor : 0].toLowerCase()}
            size={300}
            value={JSON.stringify({ userName })}
          />
        </View>
        <NavigableButton text="返回" route="Home" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.HOME} />
    </NativeBaseProvider>
  );
};
