import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserRevokePermissionMessage extends TSMSPMessage {
  userToken: string;
  other: string;
  constructor(userToken: string, other: string) {
    super();
    this.userToken = userToken;
    this.other = other;
  }
}
