import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { UserStore } from 'libs/UserStore';
import { UserAppealMessage } from 'models/api/code/appeal/UserAppealMessage';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { QueryAppealMessage } from '../../models/api/code/appeal/QueryAppealMessage';
import { UserAppeal, serializeAppeal, RawUserAppeal } from '../../models/UserAppeal';

const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const AppealPage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { token, idCard } = UserStore();

  const [IDCard, setIDCard] = useState('');
  const [reason, setReason] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState<UserAppeal>();

  async function Appeal() {
    try {
      await send(new UserAppealMessage(token, idCard, reason));
      Alert.alert('提交成功！');
      navigation.navigate('Applets');
    } catch (e) {
      console.error(e);
    }
  }

  async function QueryAppeal() {
    try {
      const result: RawUserAppeal = await send(new QueryAppealMessage(token, idCard));
      setMessage(new UserAppeal(result.idCard, result.reason, result.time));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="在线申诉" />
      <View style={styles.container}>
        <VStack space={1} alignItems="center">
          <Text bold italic underline highlight>
            申诉前请确认您十四日内未经过至少一例阳性病例所在市/(直辖市)区,本人及密切接触者无发烧、咳嗽、感冒等症状,符合疫情防控相关法律法规,在河南村镇银行没有存款,没有上访记录和上访意图。
          </Text>
          <Text bold italic underline highlight>
            请注意,在申诉通过或被拒绝前,无法再次申诉。
          </Text>
        </VStack>
        <TextInput
          text={userName}
          setText={setUserName}
          label="用户名"
          type="text"
        />
        <TextInput
          text={IDCard}
          setText={setIDCard}
          label="身份证号"
          type="text"
        />
        <TextInput
          text={reason}
          setText={setReason}
          label="申请理由简述"
          type="text"
          width="300"
        />
        {message ? (
            <Text>申诉记录： {serializeAppeal(message)}</Text>//此处存在bug，serializeappeal函数报错
        ) : (
            <Text>暂无申诉记录。</Text>
        )}
        <Button text="提交" onPress={Appeal} style={baseStyle.button} />
        <Button
          text="查询申诉记录"
          onPress={QueryAppeal}
          style={baseStyle.button}
        />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
