import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserRegisterMessage extends TSMSPMessage {
  userName: string;
  password: string;
  realName: string;
  idcard: string;
  constructor(
    userName: string,
    password: string,
    realName: string,
    idcard: string
  ) {
    super();
    this.userName = userName;
    this.password = password;
    this.realName = realName;
    this.idcard = idcard;
  }
}
