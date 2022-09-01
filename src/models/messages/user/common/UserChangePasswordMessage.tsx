import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserChangePasswordMessage extends TSMSPMessage {
  userToken: string;
  newPassword: string;
  constructor(userToken: string, newPassword: string) {
    super();
    this.userToken = userToken;
    this.newPassword = newPassword;
  }
}
