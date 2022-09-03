import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { UserName, Password } from 'models/fields';

export class UserLoginMessage extends TSMSPMessage {
  userName: UserName;
  password: Password;
  constructor(userName: UserName, password: Password) {
    super();
    this.userName = userName;
    this.password = password;
  }
}
