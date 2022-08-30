import { Header } from 'components/Header';
import { MyIcon } from 'components/MyIcon';
import { TextIn } from 'components/TextIn';
import { StatusBar } from 'expo-status-bar';
import { UserStore } from 'libs/UserStore';
import { UserAppealMessage } from 'models/messages/UserAppealMessage';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const AppealPage: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setGlobalNavigation(navigation);
  }, []);

  const [idCard, setIdCard] = useState('');
  const [reason, setReason] = useState('');
  const [userName, setUserName] = useState('');
  const { token } = UserStore();

  async function Appeal() {
    try {
      const response = await send(new UserAppealMessage(idCard, reason, token));
      navigation.navigate('Applets');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="在线申诉" />
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
            申诉前请确认您十四日内未经过至少一例阳性病例所在市/(直辖市)区,本人及密切接触者无发烧、咳嗽、感冒等症状,符合疫情防控相关法律法规,在河南村镇银行没有存款,没有上访记录和上访意图。
          </Text>
          <Text
            bold
            italic
            underline
            highlight
            _dark={{
              color: 'coolgray.800',
            }}
          >
            请注意,在申诉通过或被拒绝前,无法再次申诉。
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
          text2="申请理由简述"
          type="text"
          width="300"
        />
        <Pressable onPress={Appeal} style={baseStyle.button}>
          <Text>提交</Text>
        </Pressable>
        <MyIcon text="返回" navi="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
