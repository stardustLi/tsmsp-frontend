import React from 'react';
import QRCode from 'react-native-qrcode-svg';

export const QRCodePage: React.FC = () => {
  return <QRCode value="https://www.baidu.com" />;
};
