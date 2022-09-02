import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { date2str, zonedDate } from 'utils/date';
import * as baseStyle from 'utils/styles';
import { Text } from 'react-native';
import { Center } from 'native-base';
import { UserStore } from 'libs/UserStore';

interface MyQRCodeProps {
  color: string;
}

export const MyQRCode: React.FC<MyQRCodeProps> = (props) => {
  const [now, setNow] = useState(new Date());
  const [minute, setMinute] = useState(new Date());
  //const { admin } = UserStore();
  useEffect(() => {
    setInterval(() => setNow(new Date()), 1000);
    setInterval(() => setMinute(new Date()), 60000);
  }, []);

  const codeContent = {
    color: props.color,
    time: minute.getTime(),
  };

  return (
    <>
      <Text style={baseStyle.timeText(props.color)}>
        {date2str(zonedDate(now))}
      </Text>
      <Center>
        <QRCode
          color={props.color}
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
