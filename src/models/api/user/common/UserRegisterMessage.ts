import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard, Password, UserName } from 'models/fields';

export class UserRegisterMessage extends TSMSPMessage {
  userName: UserName;
  password: Password;
  realName: string;
  idCard: IDCard;
  constructor(
    userName: UserName,
    password: Password,
    realName: string,
    idCard: IDCard
  ) {
    super();
    this.userName = userName;
    this.password = password;
    this.realName = realName;
    this.idCard = idCard;
  }
}
