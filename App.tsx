import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AccountPage } from 'pages/account/AccountPage';
import { AuthorityPage } from 'pages/account/AuthorityPage';
import { ChangePasswordPage } from 'pages/account/ChangePasswordPage';
import { LoginPage } from 'pages/account/LoginPage';
import { MyInfoPage } from 'pages/account/MyInfoPage';
import { RegisterPage } from 'pages/account/RegisterPage';
import { AddVaccinePage } from 'pages/applets/AddVaccinePage';
import { AppealPage } from 'pages/applets/AppealPage';
import { AppletsPage } from 'pages/applets/AppletsPage';
import { JingReportPage } from 'pages/applets/JingReportPage';
import { OtherCodePage } from 'pages/applets/OtherCodePage';
import { QueryWaitingPersonPage } from 'pages/applets/QueryWaitingPersonPage';
import { ShowAcidPage } from 'pages/applets/ShowAcidPage';
import { ShowVaccinePage } from 'pages/applets/ShowVaccinePage';
import { AddNucleicAcidTestPointPage } from 'pages/home/AddNucleicAcidTestPointPage';
import { AddTracePage } from 'pages/home/AddTracePage';
import { AdminPage } from 'pages/home/AdminPage';
import { DangerousPlaceSetPage } from 'pages/home/DangerousPlaceSetPage';
import { FinishNucleicAcidTestPage } from 'pages/home/FinishNucleicAcidTestPage';
import { HomePage } from 'pages/home/HomePage';
import { PersonalCodePage } from 'pages/home/PersonalCodePage';
import { PolicyQueryPage } from 'pages/home/PolicyQueryPage';
import { PolicyUpdatePage } from 'pages/home/PolicyUpdatePage';
import { TracePage } from 'pages/home/TracePage';
import { TraceWithPeoplePage } from 'pages/home/TraceWithPeoplePage';
import { QRCodePage } from 'pages/QRCodePage';
import { ScanQRCodePage } from 'pages/ScanQRCodePage';
import { PageWrapper } from 'utils/navigation';
import { QueryRiskLevelPage } from 'pages/home/QueryRiskLevelPage';
import { AppointNucleicAcidTestPage } from 'pages/applets/AppointNucleicAcidTestPage';
import { AdminSetColorPage } from 'pages/home/AdminSetColorPage';
import { ShowAppealPage } from 'pages/applets/ShowAppealPage';
import { ShowJingReportPage } from 'pages/applets/ShowJingReportPage';

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
  PolicyQuery: PolicyQueryPage,
  JingReport: JingReportPage,
  Account: AccountPage,
  MyInfo: MyInfoPage,
  Admin: AdminPage,
  PersonalCode: PersonalCodePage,
  AddVaccine: AddVaccinePage,
  ShowVaccine: ShowVaccinePage,
  Authority: AuthorityPage,
  ChangePassword: ChangePasswordPage,
  AddTrace: AddTracePage,
  DangerousPlaceSet: DangerousPlaceSetPage,
  QueryWaitingPerson: QueryWaitingPersonPage,
  ShowAcid: ShowAcidPage,
  AddNucleicAcidTestPoint: AddNucleicAcidTestPointPage,
  PolicyUpdate: PolicyUpdatePage,
  OtherCode: OtherCodePage,
  FinishNucleicAcidTest: FinishNucleicAcidTestPage,
  QueryRiskLevel: QueryRiskLevelPage,
  AppointNucleicAcidTest: AppointNucleicAcidTestPage,
  AdminSetColor: AdminSetColorPage,
  ShowAppeal: ShowAppealPage,
  ShowJingReport: ShowJingReportPage,
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
