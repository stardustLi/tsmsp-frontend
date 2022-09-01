import { StatusBar } from 'expo-status-bar';
import { Center, NativeBaseProvider, ScrollView, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Alert, FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';

import { Trace } from 'models/Trace';
import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { PolicyQueryMessage } from 'models/messages/policy/PolicyQueryMessage';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { UserTrace } from 'models/UserTrace';
import { UserGrantPermissionMessage } from 'models/messages/user/permission/UserGrantPermissionMessage';
import { useStore } from 'zustand';
import { UserStore } from 'libs/UserStore';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
  tableRow: baseStyle.tableRow,
  tableCellOther: baseStyle.tableCellOther,
  tableHeadRow: baseStyle.tableHeadRow,
  tableHeadCellOther: baseStyle.tableHeadCellOther,
});
interface TraceTableProps {
  readonly data: UserTrace[];
}
export const UserRow: React.FC<ListRenderItemInfo<UserTrace>> = (props) => {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellOther}>{props.item.trace.province}</Text>
    </View>
  );
};
export const AuthorityPage: React.FC<TraceTableProps> = (props) => {
  const [userName, setUserName] = useState('');
  const { token } = UserStore();
  const header = (
    <View style={styles.tableHeadRow}>
      <Text style={styles.tableHeadCellOther}>当前我授权的用户</Text>
    </View>
  );
  async function GrantPermission() {
    Alert.alert('警告');
    try {
      await send(new UserGrantPermissionMessage(token, userName));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <NativeBaseProvider>
      <Header content="权限管理" />
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
            警告：获得授权的账号可以访问您的核酸结果、行程轨迹、健康码状态等信息，请勿随意授权！
          </Text>
        </VStack>
        <FlatList

          data={props.data}
          renderItem={UserRow}
          // keyExtractor={(trace) => trace.time.getTime().toString()}
          ListHeaderComponent={header}
          style={{ minWidth: 400, height: 250 }}
        />
        <View>
          <TextInput
            text={userName}
            setText={setUserName}
            label="用户名"
            type="text"
          />
          <Center>
            <Text>{userName}</Text>
            <Button text="添加为授权账号" onPress={GrantPermission} />
            <Button text="移除该授权账号" onPress={GrantPermission} />
            <NavigableButton text="返回" route="Account" />
          </Center>
        </View>
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
