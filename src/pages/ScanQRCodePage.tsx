import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import { UserStore } from 'libs/UserStore';
import { UserAddTraceMessage } from 'models/api/trace/common/UserAddTraceMessage';
import { UserAddTraceWithPeopleMessage } from 'models/api/trace/withPeople/UserAddTraceWithPeopleMessage';
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
    try {
      if (result.userName) {
        await send(
          new UserAddTraceWithPeopleMessage(token, idCard, result.userName)
        );
        Alert.alert('贴贴码扫描成功！');
      } else {
        await send(new UserAddTraceMessage(token, idCard, result.traceID));
        Alert.alert('地点码扫描成功！');
      }
    } catch (e) {
      console.error(e);
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
