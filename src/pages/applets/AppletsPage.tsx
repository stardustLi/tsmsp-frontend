import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppletsRow } from 'components/AppletsRow';
import { BottomBar, BottomTab } from 'components/BottomBar';
import { Header } from 'components/ui/Header';
import * as baseStyle from 'utils/styles';
import type { TabNames } from '../../../App';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

interface AppletCategory {
  category: string;
  applets: {
    text: string;
    route: TabNames;
  }[];
}

const applets: AppletCategory[] = [
  {
    category: '政府零距离',
    applets: [
      {
        text: '政策\n查询',
        route: 'PolicyInquiry',
      },
      {
        text: '在线\n申诉',
        route: 'Appeal',
      },
      {
        text: '进京\n报备',
        route: 'JingReport',
      },
    ],
  },
  {
    category: '核酸服务',
    applets: [
      {
        text: '核酸结\n果查询',
        route: 'ShowVaccine',
      },
      {
        text: '预约\n检测',
        route: 'Home',
      },
      {
        text: '排队人\n数查询',
        route: 'Home',
      },
    ],
  },
  {
    category: '疫苗服务',
    applets: [
      {
        text: '疫苗\n查询',
        route: 'ShowVaccine',
      },
      {
        text: '疫苗\n预约',
        route: 'Home',
      },
      {
        text: '记录\n疫苗',
        route: 'AddVaccine',
      },
    ],
  },
  {
    category: '猫猫真猫',
    applets: [
      {
        text: '小猫',
        route: 'ShowVaccine',
      },
      {
        text: '猫猫',
        route: 'Home',
      },
      {
        text: '返回',
        route: 'Home',
      },
    ],
  },
];

export const AppletsPage: React.FC = () => {
  return (
    <NativeBaseProvider>
      <Header content="小程序" />
      <View style={styles.container}>
        <ScrollView>
          <>
            {applets.map((category, idx) => (
              <AppletsRow
                key={category.category}
                title={category.category}
                applets={category.applets}
                colour={300 + idx * 100}
              />
            ))}
          </>
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.APPLETS} />
    </NativeBaseProvider>
  );
};
