import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginPage } from 'pages/LoginPage';
import { RegisterPage } from 'pages/RegisterPage';
import { HomePage } from 'pages/HomePage';
import { TracePage } from 'pages/TracePage';
import { ScanQRCodePage } from 'pages/ScanQRCodePage';
import { QRCodePage } from 'pages/QRCodePage';
import { TestPage } from 'pages/TestPage';
import { AppletsPage } from 'pages/AppletsPage';
import { TraceWithPeoplePage } from 'pages/TraceWithPeoplePage';
import { AppealPage } from 'pages/AppealPage';
import { PolicyInquiryPage } from 'pages/PolicyInquiry'

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Trace: undefined;
  ScanQRCode: undefined;
  QRCode: undefined;
  Test: undefined;
  Applets: undefined;
  TraceWithPeople: undefined;
  Appeal: undefined;
  PolicyInquiry: undefined;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Trace"
            component={TracePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScanQRCode"
            component={ScanQRCodePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QRCode"
            component={QRCodePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Test"
            component={TestPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Applets"
            component={AppletsPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TraceWithPeople"
            component={TraceWithPeoplePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Appeal"
            component={AppealPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PolicyInquiry"
            component={PolicyInquiryPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
