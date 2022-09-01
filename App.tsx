import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountPage } from 'pages/account/AccountPage';
import { LoginPage } from 'pages/account/LoginPage';
import { MyInfoPage } from 'pages/account/MyInfoPage';
import { RegisterPage } from 'pages/account/RegisterPage';
import { AddVaccinePage } from 'pages/applets/AddVaccinePage';
import { AppealPage } from 'pages/applets/AppealPage';
import { AppletsPage } from 'pages/applets/AppletsPage';
import { JingReportPage } from 'pages/applets/JingReportPage';
import { ShowVaccinePage } from 'pages/applets/ShowVaccinePage';
import { AdminPage } from 'pages/home/AdminPage';
import { AuthorityPage } from 'pages/account/AuthorityPage';
import { HomePage } from 'pages/home/HomePage';
import { PersonalCodePage } from 'pages/home/PersonalCodePage';
import { PolicyInquiryPage } from 'pages/home/PolicyInquiryPage';
import { TracePage } from 'pages/home/TracePage';
import { TraceWithPeoplePage } from 'pages/home/TraceWithPeoplePage';
import { QRCodePage } from 'pages/QRCodePage';
import { ScanQRCodePage } from 'pages/ScanQRCodePage';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PageWrapper } from 'utils/navigation';
import { ChangePasswordPage } from 'pages/account/ChangePasswordPage';

const Stack = createNativeStackNavigator();

const Tabs = {
  Login: LoginPage,
  Register: RegisterPage,
  Home: HomePage,
  Trace: TracePage,
  ScanQRCode: ScanQRCodePage,
  QRCode: QRCodePage,
  Applets: AppletsPage,
  TraceWithPeople: TraceWithPeoplePage,
  Appeal: AppealPage,
  PolicyInquiry: PolicyInquiryPage,
  JingReport: JingReportPage,
  Account: AccountPage,
  MyInfo: MyInfoPage,
  Admin: AdminPage,
  PersonalCode: PersonalCodePage,
  AddVaccine: AddVaccinePage,
  ShowVaccine: ShowVaccinePage,
  Authority: AuthorityPage,
  ChangePassword: ChangePasswordPage,
};

export type TabNames = keyof typeof Tabs;

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {Object.entries(Tabs).map(([key, page]) => (
            <Stack.Screen
              key={key}
              name={key}
              component={PageWrapper(page)}
              options={{ headerShown: false }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
