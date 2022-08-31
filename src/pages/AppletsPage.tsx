import BottomNavi, { BottomTab } from 'components/BottomNavi';
import { Header } from 'components/Header';
import { MyBox } from 'components/MyBox';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ScreenProps, setGlobalNavigation } from 'utils/navigation';
import * as baseStyle from 'utils/styles';

const styles = StyleSheet.create({
  container: baseStyle.container,
  input: baseStyle.input,
  label: baseStyle.label,
});

export const AppletsPage: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setGlobalNavigation(navigation);
  }, []);
  /*
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [realName, setRealName] = useState('');

  async function Applets() {
    try {
      const response = await send(
        new UserTestMessage(userName, password, realName)
      );
      navigation.navigate('Trace');
    } catch (e) {
      console.error(e);
    }
  }
*/
  return (
    <NativeBaseProvider>
      <Header content="小程序" />
      <View style={styles.container}>
        <ScrollView>
          <MyBox
            text1={'政策\n查询'}
            text2={'在线\n申诉'}
            text3={'入京\n报备'}
            navi1="PolicyInquiry"
            navi2="Appeal"
            navi3="JingReport"
            title="政府零距离"
            colour={300}
          />
          <MyBox
            text1={'疫苗\n查询'}
            text2={'疫苗\n预约'}
            text3={'记录\n疫苗'}
            navi1="ShowVaccine"
            navi2="Home"
            navi3="AddVaccine"
            title="疫苗核酸"
            colour={400}
          />
          <MyBox
            text1={'健康码\n代查'}
            text2="box2"
            text3="返回"
            navi1="Home"
            navi2="Home"
            navi3="Home"
            colour={500}
          />
          <MyBox
            text1="box1"
            text2="box2"
            text3="返回"
            navi1="Home"
            navi2="Home"
            navi3="Home"
            colour={600}
          />
          <StatusBar style="auto" />
        </ScrollView>
      </View>
      <BottomNavi tab={BottomTab.applets} />
    </NativeBaseProvider>
  );
};
