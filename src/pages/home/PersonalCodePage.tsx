import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import { UserGetColorMessage } from 'models/api/code/UserGetColorMessage';
import { CodeColor } from 'models/enums/CodeColor';
import { colorDict } from 'utils/codeColor';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const PersonalCodePage: React.FC = () => {
  const { userName, token, idCard } = UserStore();

  const [codeColor, setCodeColor] = useState<CodeColor | null>(null);

  useEffect(() => {
    getCodeColor();
  }, []);

  async function getCodeColor() {
    try {
      const response = await send(new UserGetColorMessage(token, idCard));
      setCodeColor(response);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
                  <ImageBackground source={require('../../assets/lsz.png')} style={{ width: '100%', height: '100%' }}>
      <Header content={`${userName} 的个人地点码`} />
      <View style={styles.container}>
        <View style={{ marginBottom: 14 }}>
          <QRCode
            color={colorDict[codeColor ?? CodeColor.GREEN]}
            size={300}
            value={JSON.stringify({ userName })}
          />
        </View>
        <NavigableButton text="返回" route="Home" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.HOME} /></ImageBackground>
    </NativeBaseProvider>
  );
};
