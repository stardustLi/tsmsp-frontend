import { differenceInDays } from 'date-fns';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { MyQRCode } from 'components/MyQRCode';
import { DisplayColumn } from 'components/ui/DisplayColumn';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import { GetNucleicAcidTestResultsMessage } from 'models/api/nucleicAcidTest/GetNucleicAcidTestResultsMessage';
import { RawUserAcid, UserAcid } from 'models/UserAcid';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const HomePage: React.FC = () => {
  const { userName, idCard, token } = UserStore();

  const [codeColor, setCodeColor] = useState('');
  const [result, setResult] = useState('');
  const [timeLength, setTimeLength] = useState('');
  async function fetchAcid() {
    try {
      const acids: RawUserAcid[] = await send(
        new GetNucleicAcidTestResultsMessage(token, idCard)
      );
      const response = acids
        .map(
          ({ time: timestamp, testPlace, result }) =>
            new UserAcid(testPlace, timestamp, result)
        )
        .reverse();

      if (response[0] != null) {
        if (response[0].result) {
          setCodeColor('red');
          setResult('阳性');
          setTimeLength(
            differenceInDays(new Date(), response[0].time!).toString()
          );
        } else {
          setCodeColor('green');
          setResult('阴性');
          setTimeLength(
            differenceInDays(new Date(), response[0].time!).toString()
          );
        }
      } else {
        setCodeColor('yellow');
        setResult('无结果');
        setTimeLength('NaN');
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchAcid();
    setInterval(() => {
      fetchAcid();
    }, 1000);
  }, []);
  console.log(codeColor);
  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require('../../assets/lsz.png')}
        style={{ width: '100%', height: '100%' }}
      >
        <Header content={`${userName} 的猫宽健康宝`} />

        <View style={styles.container}>
          <View style={{ marginBottom: 14 }}>
            <MyQRCode />
          </View>
          <DisplayColumn
            text={`核酸 ${result}        时间 ${timeLength} 天`}
            color={codeColor}
          />
          <NavigableButton text="手动提交新轨迹" route="AddTrace" />
          <NavigableButton text="轨迹查询" route="Trace" />
          <NavigableButton text="我的贴贴码" route="PersonalCode" />
          <NavigableButton text="自定义功能" route="Applets" />
          <StatusBar style="auto" />
        </View>

        <BottomBar tab={BottomTab.HOME} />
      </ImageBackground>
    </NativeBaseProvider>
  );
};
