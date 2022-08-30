import { UserStore } from 'libs/UserStore';
import { UserAddTraceMessage } from 'models/messages/UserAddTraceMessage';
import { Trace } from 'models/Trace';
import React, { useState } from 'react';
import { Pressable, Text, TextInput } from 'react-native';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

export const AddTrace: React.FC = () => {
  const navigation = globalNavigation()!;
  const { idCard, token } = UserStore();
  const [newTrace, setNewTrace] = useState<Trace | null>(null);

  async function addTrace() {
    try {
      await send(new UserAddTraceMessage(token, idCard, newTrace!));
    } catch (e) {
      console.error(e);
    }
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
