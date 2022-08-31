import { UserStore } from 'libs/UserStore';
import { UserAddTraceMessage } from 'models/messages/UserAddTraceMessage';
import { Trace } from 'models/Trace';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { globalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';
import { Button } from './Button';

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
      <Button
        text="扫场所码登记"
        onPress={() => navigation.navigate('ScanQRCode')}
      />
      <Text style={baseStyle.label}>手动登记</Text>
      {/* <TextInput label="手动登记" text={'err'} onChangeText={setNewTrace} /> */}
      <Button text="提交新轨迹" onPress={addTrace} />
    </>
  );
};
