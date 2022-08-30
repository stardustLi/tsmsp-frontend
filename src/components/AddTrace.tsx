import { Pressable, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { globalNavigation, setGlobalNavigation } from 'utils/navigation';
import { UserAddTraceMessage } from 'models/messages/UserAddTraceMessage';
import { send } from 'utils/web';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';

export const AddTrace: React.FC = () => {
  const navigation = globalNavigation()!;
  const { idCard, token } = UserStore();
  const [newTrace, setNewTrace] = useState('');
  async function add_Trace() {
    try {
      const response = await send(new UserAddTraceMessage(token, idCard, newTrace));
    } catch (e) {
      console.error(e);
    }
    setNewTrace('');
  }

  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('ScanQRCode')}
        style={baseStyle.button}
      >
        <Text>扫场所码登记</Text>
      </Pressable>
      <Text style={baseStyle.label}>手动登记</Text>
      <TextInput
        placeholder="手动登记"
        style={baseStyle.input}
        value={newTrace}
        onChangeText={(newText: string) => setNewTrace(newText)}
      />
      <Pressable onPress={add_Trace} style={baseStyle.button}>
        <Text>提交新轨迹</Text>
      </Pressable>
    </>
  );
};
