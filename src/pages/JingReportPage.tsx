import { Header } from 'components/Header';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
//import "./styles.css";
import { MyCheckBox } from 'components/MyCheckBox';
import { MyIcon } from 'components/MyIcon';
import { TextIn } from 'components/TextIn';
import { JingReportMessage } from 'models/messages/JingReportMessage';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import { alertBox } from 'utils/alert';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';

const styles = StyleSheet.create({
  container: baseStyle.container,
  header: baseStyle.header,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const JingReportPage: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setGlobalNavigation(navigation);
  }, []);

  const [idCard, setIdCard] = useState('');
  const [reason, setReason] = useState('');
  const [userName, setUserName] = useState('');
  const [checkedFirst, setCheckedFirst] = useState(false);
  const [checkedSecond, setCheckedSecond] = useState(false);
  const { token } = UserStore();

  async function JingReport() {
    if (checkedFirst && checkedSecond) {
      try {
        await send(new JingReportMessage(idCard, reason, token));
        navigation.navigate('Applets');
      } catch (e) {
        console.error(e);
      }
    } else {
      alertBox('请确认已勾选承诺！');
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="进京报备" />
      <View style={styles.container}>
        <VStack space={1} alignItems="center">
          <Text
            bold
            italic
            underline
            highlight
            _dark={{
              color: 'coolgray.800',
            }}
          >
            报备前请确认您十四日内未经过至少一例阳性病例所在市/(直辖市)区,本人及密切接触者无发烧、咳嗽、感冒等症状,符合疫情防控相关法律法规。
          </Text>
        </VStack>
        <TextIn
          text={userName}
          setText={setUserName}
          text2="用户名"
          type="text"
        />
        <TextIn
          text={idCard}
          setText={setIdCard}
          text2="身份证号"
          type="text"
        />
        <TextIn
          text={reason}
          setText={setReason}
          text2="进京理由简述"
          type="text"
          width="300"
        />
        <MyCheckBox
          message="我承诺14日内未途径中高风险区所在市"
          checked={checkedFirst}
          handleChange={setCheckedFirst}
        />
        <MyCheckBox
          message="我承诺本人和同行者无感冒、头痛、发烧、不想写代码等症状"
          checked={checkedSecond}
          handleChange={setCheckedSecond}
        />
        <Pressable onPress={JingReport} style={baseStyle.button}>
          <Text>提交</Text>
        </Pressable>
        <MyIcon text="返回" navi="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
