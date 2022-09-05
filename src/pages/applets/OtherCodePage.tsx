import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Stack, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { BottomBar, BottomTab } from 'components/BottomBar';
import { MyQRCode } from 'components/MyQRCode';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';
import { Button } from 'components/ui/Button';
import { globalNavigation } from 'utils/navigation';

import { TextInput } from 'components/ui/TextInput';
import { send } from 'utils/web';
import { UserGetColorMessage } from 'models/api/code/UserGetColorMessage';
import { UserWhetherGrantedMessage } from 'models/api/user/permission/UserWhetherGrantedMessage';
import { CodeColor } from 'models/enums/CodeColor';


const styles = StyleSheet.create({
  container: baseStyle.container,
});

export const OtherCodePage: React.FC = () => {
  const navigation = globalNavigation()!;
  const { userName, admin, token } = UserStore();
  const [otherIdcard, setOtherIdcard] = useState('');
  const [permission, setPermission] = useState(Boolean);
  const [quiry, setQuiry] = useState(Boolean);
  const [codeColor, setCodeColor] = useState<number | null>(null);
  
  async function getOtherCodeColor() {
    try {
      const response = await send(new UserGetColorMessage(token, otherIdcard));
      setCodeColor(response);
    } catch (e) {
      console.error(e);
    }
  }
  async function getOtherCode() {
    try{
      const response = await send(new UserWhetherGrantedMessage(token, otherIdcard));
      setPermission(response);
      if (response){
        setQuiry(true);
        getOtherCodeColor()
        //Alert.alert("您有权限访问该用户的健康码！")
      }
      else {
        Alert.alert("您没有权限访问该用户的健康码！")
      }
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="健康码代查" />
      <View style={styles.container}>

        <View style={{ marginBottom: 14 }}>
          {quiry? (<MyQRCode color={CodeColor[Number(codeColor ? codeColor : 0)].toLowerCase()} />) : (
            <Stack minHeight={100}></Stack>
          )}
        </View>

        <TextInput
          text={otherIdcard}
          setText={setOtherIdcard}
          label="被查询者的身份证号"
          type={undefined}
        />        
        <Button
          text="查询"
          onPress={getOtherCode}
        />
        <NavigableButton text="返回" route="Applets" />
        <StatusBar style="auto" />
      </View>
      <BottomBar tab={BottomTab.HOME} />
    </NativeBaseProvider>
  );
};
