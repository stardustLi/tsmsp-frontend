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
        route: 'PolicyUpdate',
      },
      {
        text: '处理\n申诉',
        route: 'ShowAppeal',
      },
      {
        text: '查看\n报备',
        route: 'ShowJingReport',
      },
    ],
  },
  {
    category: '',
    applets: [
      {
        text: '风险地\n区设置',
        route: 'DangerousPlaceSet',
      },
      {
        text: '核酸结\n果上传',
        route: 'FinishNucleicAcidTest',
      },
      {
        text: '增加核\n酸点',
        route: 'AddNucleicAcidTestPoint',
      },
    ],
  },
  {
    category: '其他',
    applets: [
      {
        text: '健康码\n设置',
        route: 'AdminSetColor',
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
