import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import { UserStore } from 'libs/UserStore';
import { APIUrl } from 'libs/api/url';
import { UserAddTraceMessage } from 'models/messages/UserAddTraceMessage';
import { POST } from 'utils/web';
import { ScreenProps } from '../../App';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export const ScanQRCodePage: React.FC<ScreenProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const { token } = UserStore();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: BarCodeEvent) => {
    setScanned(true);

    try {
      const response = await POST(
        APIUrl,
        new UserAddTraceMessage(token, data)
      );
      if (response.status !== 0) throw new Error(response.message);
      alert(response.message);
    } catch (e) {
      console.error(e);
    }

    navigation.navigate('Home');
  };

  if (hasPermission === null)
    return <Text>Requesting for camera permission</Text>;
  else if (!hasPermission) return <Text>No access to camera</Text>;

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
