import React, { useState } from 'react';
import { Text } from 'react-native';

import { Button } from 'components/ui/Button';
import { UserStore } from 'libs/UserStore';
import { UserAddTraceMessage } from 'models/messages/trace/common/UserAddTraceMessage';
import { Trace } from 'models/Trace';
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
      <Button
        text="扫码登记"
        style={baseStyle.button}
        onPress={() => navigation.navigate('ScanQRCode')}
      />
      {/* <Text style={baseStyle.label}>手动登记</Text> */}
      {/* <TextInput label="手动登记" text={'err'} onChangeText={setNewTrace} /> */}
      <Button text="手动提交新轨迹" onPress={addTrace} />
    </>
  );
};
