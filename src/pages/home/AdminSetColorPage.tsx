import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Stack } from 'native-base';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { Select } from 'components/ui/Select';
import { UserStore } from 'libs/UserStore';
import { AdminSetColorMessage } from 'models/api/code/AdminSetColorMessage';
import { CodeColor } from 'models/enums/CodeColor';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import {TextInput} from "../../components/ui/TextInput";

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const AdminSetColorPage: React.FC = () => {
  const { token } = UserStore();

  const [idCard, setIdCard] = useState('');
  const [codeColor, setCodeColor] = useState(CodeColor.GREEN);

  async function AdminSetColor() {
    try {
      await send(new AdminSetColorMessage(token, idCard, codeColor));
      Alert.alert('设置成功！');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="健康码颜色设置" />
      <View style={styles.container}>
        <ScrollView>
          <Stack minHeight={120}></Stack>
            <Text>用户身份证号</Text>
            <TextInput
                text={idCard}
                setText={setIdCard}
                label="用户身份证号"
                type="text"
            />
          <Select
            value={CodeColor.toString()}
            setValue={(newValue) => setCodeColor(Number(newValue))}
            placeholder="健康码颜色"
            items={[
              {
                label: '绿码',
                value: CodeColor.GREEN.toString(),
              },
              {
                label: '蓝码',
                value: CodeColor.ALERT.toString(),
              },
              {
                label: '黄码',
                value: CodeColor.YELLOW.toString(),
              },
                {
                    label: '红码',
                    value: CodeColor.RED.toString(),
                },
            ]}
          />
          <Button text="设置" onPress={AdminSetColor} />
          <NavigableButton text="返回" route="Admin" />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomBar tab={BottomTab.APPLETS} />
    </NativeBaseProvider>
  );
};
