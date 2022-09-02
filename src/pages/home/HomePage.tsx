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

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const HomePage: React.FC = () => {
  const { userName,admin } = UserStore();

  return (
    <NativeBaseProvider>
      <Header content={`${userName} 的猫宽健康宝`} />
      <View style={styles.container}>
        <View style={{ marginBottom: 14 }}>
          <MyQRCode color="red" />
        </View>
        <AddTrace />
        {admin ? (
          <Text>爷是尊贵的管理员</Text>
        ) : (
          <Text>爷不是管理员</Text>
        )}
        <NavigableButton text="我的贴贴码" route="PersonalCode" />
        <NavigableButton text="轨迹查询" route="Trace" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.HOME} />
    </NativeBaseProvider>
  );
};
