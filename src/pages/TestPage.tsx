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
        <Icon text="返回" navi="Home" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
