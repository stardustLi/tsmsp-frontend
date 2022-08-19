import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {Login} from "Pages/Login";
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {Register} from "./src/Pages/Register";
import {Trace} from "./src/Pages/Trace";
import {ScanQRCode} from "./src/Pages/ScanQRCode";
import {QRCodePage} from "./src/Pages/QRCode";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={Login}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={Register}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="Trace" component={Trace}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="ScanQRCode" component={ScanQRCode}
                      options={{ headerShown: false }}
        />
        <Stack.Screen name="QRCode" component={QRCodePage}
                      options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

function PB(){
  return <View style={styles.container}>
    <Text>404 Not Found!</Text>
    <StatusBar style="auto" />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
