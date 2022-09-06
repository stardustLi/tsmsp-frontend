import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { MyQRCode } from 'components/MyQRCode';
import { isToday, format, differenceInDays } from 'date-fns';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { DisplayColumn } from 'components/ui/DisplayColumn';
import { RawUserAcid, UserAcid } from 'models/UserAcid';
import { GetNucleicAcidTestResultsMessage } from 'models/api/nucleicAcidTest/GetNucleicAcidTestResultsMessage';
import { send } from 'utils/web';
import { date2datestr } from 'utils/date';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const HomePage: React.FC = () => {
  const navigation = globalNavigation()!;const now =Number(date2datestr(new Date));
  const { userName, idCard, token } = UserStore();
  const [acidHistory, setAcidHistory] = useState<UserAcid[]>([]);
  const [codeColor, setCodeColor] = useState('');
  const [result, setResult] = useState('');
  const [timeLength, setTimeLength] = useState('');
  async function fetchAcid() {
    try {
      const acids: RawUserAcid[] = await send(
        new GetNucleicAcidTestResultsMessage(token, idCard)
      );        
      const response = acids.map(
          ({ time: timestamp, testPlace, result }) =>
            new UserAcid(testPlace, timestamp, result)
        ).reverse()
      setAcidHistory(response);
      // if (response[0] != null){
        if (response[0].result) {
          const now =Number(date2datestr(new Date));
          setCodeColor('red');
          setResult('阳性');
          //setTimeLength((now - Number(date2datestr(acidHistory[0].time))).toString())
          setTimeLength((differenceInDays(response[0].time!, new Date())).toString())
        }
        else {
          setCodeColor('green');
          setResult('阴性');
          setTimeLength((differenceInDays(response[0].time!, new Date())).toString())
        }       
      // }
      // else {
      //   setCodeColor('yellow');
      //   setResult('无结果');
      //   setTimeLength("NaN");
      // }

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
      <Header content={`${userName} 的猫宽健康宝`} />
      <View style={styles.container}>
        <View style={{ marginBottom: 14 }}>
          <MyQRCode  />
        </View>
 
        {/* <Text> {acidHistory[0]? acidHistory[0].result.toString() : '112'}11</Text> */}

        {/* <Button
          text="扫码登记"
          style={baseStyle.button}
          onPress={() => navigation.navigate('ScanQRCode')}
        /> */}
        <DisplayColumn text={`核酸 ${result}         时间 ${timeLength} 天`} color={codeColor}/>
        {/* <Text> {(acidHistory[0] ? acidHistory[0].time : 1).toString()}</Text> */}
        <NavigableButton text="手动提交新轨迹" route="AddTrace" />
        <NavigableButton text="轨迹查询" route="Trace" />
        <NavigableButton text="我的贴贴码" route="PersonalCode" />
        <NavigableButton text="自定义功能" route="Applets" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.HOME} />
    </NativeBaseProvider>
  );
};
