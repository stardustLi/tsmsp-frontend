import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider,Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AddTrace } from 'components/AddTrace';
import { BottomBar, BottomTab } from 'components/BottomBar';
import { MyQRCode } from 'components/MyQRCode';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { Button } from 'components/ui/Button';
import { globalNavigation } from 'utils/navigation';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import Background from 'components/ImageBackground';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const HomePage: React.FC = () => {
  const navigation = globalNavigation()!;
  const { userName,admin } = UserStore();

  return (
    <NativeBaseProvider>


      <Header content={`${userName} 的猫宽健康宝`} />
      <View style={styles.container}>

        <View style={{ marginBottom: 14 }}>
          <MyQRCode color="red" />
        </View>

        <Button
          text="扫码登记"
          style={baseStyle.button}
          onPress={() => navigation.navigate('ScanQRCode')}
        />
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
