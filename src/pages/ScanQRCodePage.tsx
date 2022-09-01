import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import { UserStore } from 'libs/UserStore';
import { UserAddTraceMessage } from 'models/messages/trace/common/UserAddTraceMessage';
import { UserAddTraceWithPeopleMessage } from 'models/messages/trace/withPeople/UserAddTraceWithPeopleMessage';
import { Trace } from 'models/Trace';
import { UserInfo } from 'models/UserInfo';
import { globalNavigation } from 'utils/navigation';
import { send } from 'utils/web';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export const ScanQRCodePage: React.FC = () => {
  const navigation = globalNavigation()!;

  const { idCard, token } = UserStore();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: BarCodeEvent) => {
    setScanned(true);

    const result = JSON.parse(data);
    if (result.idCard) {
      const userInfo = result as UserInfo;
      Alert.alert("aaaa");
      try {
        await send(
          new UserAddTraceWithPeopleMessage(token, idCard, userInfo.idCard)
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      const trace = result as Trace;
      Alert.alert("bbbb");
      try {
        await send(new UserAddTraceMessage(token, idCard, trace));
      } catch (e) {
        console.error(e);
      }
    }

    navigation.navigate('Home');
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  } else if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};
