import { Pressable, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { globalNavigation, setGlobalNavigation } from 'utils/navigation';
import { APIUrl } from 'libs/api/url';
import { UserAddTraceMessage } from 'models/messages/UserAddTraceMessage';
import { POST } from 'utils/web';
import { UserStore } from 'libs/UserStore';
import * as baseStyle from 'utils/styles';

export const AddTrace: React.FC = () => {
  const navigation = globalNavigation()!;
  const { token } = UserStore();
  const [newTrace, setNewTrace] = useState('');
  async function add_Trace() {
    try {
      const response = await POST(
        APIUrl,
        new UserAddTraceMessage(token, newTrace)
      );
      if (response.status !== 0) throw new Error(response.message);
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
