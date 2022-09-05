import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { Password } from 'models/fields';

export class UserChangePasswordMessage extends TSMSPMessage {
  userToken: string;
  newPassword: Password;
  constructor(userToken: string, newPassword: Password) {
    super();
    this.userToken = userToken;
    this.newPassword = newPassword;
  }
}
