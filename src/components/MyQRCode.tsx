import { Center } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { UserStore } from 'libs/UserStore';
import { UserGetColorMessage } from 'models/api/code/UserGetColorMessage';
import { CodeColor } from 'models/enums/CodeColor';
import { colorDict } from 'utils/codeColor';
import { date2str, zonedDate } from 'utils/date';
import * as baseStyle from 'utils/styles';
import { send } from 'utils/web';

interface MyQRCodeProps {
  readonly color?: string;
}

export const MyQRCode: React.FC<MyQRCodeProps> = (props) => {
  const { token, idCard } = UserStore();

  const [now, setNow] = useState(new Date());
  const [minute, setMinute] = useState(new Date());
  const [codeColor, setCodeColor] = useState<CodeColor | null>(null);

  useEffect(() => {
    setInterval(() => setNow(new Date()), 1000);
    setInterval(() => {
      setMinute(new Date());
      getCodeColor();
    }, 60000);
    getCodeColor();
  }, []);

  const codeContent = {
    color: props.color,
    time: minute.getTime(),
  };

  async function getCodeColor() {
    if (props.color) return;
    try {
      const response = await send(new UserGetColorMessage(idCard, token));
      setCodeColor(response);
    } catch (e) {
      console.error(e);
    }
  }

  const defaultColorString = colorDict[codeColor ?? CodeColor.GREEN];

  return (
    <>
      <Text
        style={baseStyle.timeText(
          props.color ? props.color : defaultColorString
        )}
      >
        {date2str(zonedDate(now))}
      </Text>
      <Center>
        <QRCode
          color={props.color ? props.color : defaultColorString}
          backgroundColor="white"
          logo={require('../assets/千束.png')}
          logoMargin={5}
          logoSize={50}
          size={250}
          value={JSON.stringify(codeContent)}
        />
      </Center>
    </>
  );
};
