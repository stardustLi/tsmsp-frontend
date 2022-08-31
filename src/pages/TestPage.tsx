import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from 'components/Header';
import { MyIcon as Icon } from 'components/MyIcon';
import { NativeBaseProvider } from 'native-base';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const TestPage: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setGlobalNavigation(navigation);
  }, []);

  return (
    <NativeBaseProvider>
      <Header content="小程序" />
      <View style={styles.container}>
        {/* <MyBox
          text1="box1"
          text2="box2"
          text3="返回"
          colour={300}
          navi2={'Trace'}
        />
        <MyBox
          text1="box1"
          text2="box2"
          text3="返回"
          colour={400}
          navi2={'Trace'}
        />
        <MyBox
          text1="box1"
          text2="box2"
          text3="返回"
          colour={500}
          navi2={'Trace'}
        />
        <MyBox
          text1="box1"
          text2="box2"
          text3="返回"
          colour={600}
          navi2={'Trace'}
        /> */}
        <Icon text="返回" navi="Home" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
