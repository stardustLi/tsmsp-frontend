import { StatusBar } from 'expo-status-bar';
import { Center, NativeBaseProvider, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';

import { Button } from 'components/ui/Button';
import { Header } from 'components/ui/Header';
import { NavigableButton } from 'components/ui/NavigableButton';
import { TextInput } from 'components/ui/TextInput';
import { UserStore } from 'libs/UserStore';
import { UserFetchAllGrantedUsersMessage } from 'models/messages/user/permission/UserFetchAllGrantedUsersMessage';
import { UserGrantPermissionMessage } from 'models/messages/user/permission/UserGrantPermissionMessage';
import { UserRevokePermissionMessage } from 'models/messages/user/permission/UserRevokeUserRevokePermissionMessage';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: baseStyle.container,
  tableRow: baseStyle.tableRow,
  tableCellOther: baseStyle.tableCellOther,
  tableHeadRow: baseStyle.tableHeadRow,
  tableHeadCellOther: baseStyle.tableHeadCellOther,
});

const UserRow: React.FC<ListRenderItemInfo<string>> = (props) => {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellOther}>{props.item}</Text>
    </View>
  );
};

export const AuthorityPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const { token } = UserStore();
  const [message, setMessage] = useState<string[]>([]);

  const header = (
    <View style={styles.tableHeadRow}>
      <Text style={styles.tableHeadCellOther}>当前我授权的用户</Text>
    </View>
  );

  async function GrantPermission() {
    try {
      await send(new UserGrantPermissionMessage(token, userName));
      Alert.alert('添加成功！');
    } catch (e) {
      console.error(e);
    }
  }

  async function RevokePermission() {
    try {
      await send(new UserRevokePermissionMessage(token, userName));
      Alert.alert('移除成功！');
    } catch (e) {
      console.error(e);
    }
  }

  async function FetchPermission() {
    try {
      const response = await send(new UserFetchAllGrantedUsersMessage(token));
      setMessage(response);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    FetchPermission();
  }, []);

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
          data={message}
          renderItem={UserRow}
          keyExtractor={(userName) => userName}
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
            <Button text="刷新" onPress={FetchPermission} />
            <Button text="添加为授权账号" onPress={GrantPermission} />
            <Button text="移除该授权账号" onPress={RevokePermission} />
            <NavigableButton text="返回" route="Account" />
          </Center>
        </View>
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
};
