import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { date2str, zonedDate } from 'utils/date';
import * as baseStyle from 'utils/styles';
import { Text } from 'react-native';
import { Center } from 'native-base';
import { UserStore } from 'libs/UserStore';
import { UserGetColorMessage } from 'models/messages/code/appeal/UserGetColorMessage';
import { send } from 'utils/web';
import { CodeColor } from 'models/CodeColor';

interface MyQRCodeProps {
  color?: string;
}

export const MyQRCode: React.FC<MyQRCodeProps> = (props) => {
  const [now, setNow] = useState(new Date());
  const [minute, setMinute] = useState(new Date());
  const { token, idCard } = UserStore();
  const [codeColor, setCodeColor] = useState<number | null>(null);
  //const { admin } = UserStore();
  useEffect(() => {
    setInterval(() => setNow(new Date()), 1000);
    setInterval(() => setMinute(new Date()), 60000);
    getCodeColor();
  }, []);

  const codeContent = {
    color: props.color,
    time: minute.getTime(),
  };

  async function getCodeColor() {
    try {
      const response = await send(new UserGetColorMessage(idCard, token));
      setCodeColor(response);
    } catch (e) {
      console.error(e);
    }
  }

  // const hackCodeColor = codecolor == null ? 0 : codeColor;
  // let x: CodeColor = CodeColor.GREEN;
  // let y: number = x;
  // let z: CodeColor = y as CodeColor;
  return (
    <>
      <Text
        style={baseStyle.timeText(
          props.color ? props.color : (CodeColor[Number(codeColor ? codeColor : 0)].toLowerCase()) 
        )}
      >
        {date2str(zonedDate(now))}
      </Text>
      {/* <Text style={baseStyle.timeText(props.color)}>
        {CodeColor[codeColor!]}
      </Text> */}
      <Center>
        <QRCode
          color={props.color ? props.color : (CodeColor[Number(codeColor ? codeColor : 0)].toLowerCase()) }
          backgroundColor={'white'}
          logo={require('../assets/千束.png')}
          logoMargin={5}
          logoSize={50}
          //logo={1}
          // quietZone={50}
          size={250}
          value={JSON.stringify(codeContent)}
        />
      </Center>
    </>
  );
};
