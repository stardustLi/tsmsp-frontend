import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserRegisterMessage extends TSMSPMessage {
  userName: string;
  password: string;
  realName: string;
  idcard: String;
  constructor(
    userName: string,
    password: string,
    realName: string,
    idcard: String
  ) {
    super();
    this.userName = userName;
    this.password = password;
    this.realName = realName;
    this.idcard = idcard;
  }
}
