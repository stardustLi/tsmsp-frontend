import { StatusBar } from 'expo-status-bar';
import { Center, NativeBaseProvider } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppletsRow } from 'components/AppletsRow';
import { BottomBar, BottomTab } from 'components/BottomBar';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
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
    category: '',
    applets: [
      {
        text: '政策\n设置',
        route: 'PolicyQuery',
      },
      {
        text: '处理\n申诉',
        route: 'Appeal',
      },
      {
        text: '进京\n报备',
        route: 'JingReport',
      },
    ],
  },
  {
    category: '',
    applets: [
      {
        text: '我是\n赋码爷',
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
];

export const AdminPage: React.FC = () => {
  return (
    <NativeBaseProvider>
      <Header content="管理员" />
      <View style={styles.container}>
        <ScrollView>
          <>
            {applets.map((category, idx) => (
              <AppletsRow
                key={category.category}
                title={category.category}
                applets={category.applets}
                colour={300 + idx * 100}
                tone="yellow"
              />
            ))}
          </>

          <StatusBar style="auto" />
        </ScrollView>
        <Center>
          <NavigableButton color="yellow" text="返回" route="Account" />
        </Center>
      </View>
      <BottomBar tab={BottomTab.ACCOUNT} />
    </NativeBaseProvider>
  );
};
