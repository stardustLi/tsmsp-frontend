import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { UserName } from 'models/fields';

export class UserRevokePermissionMessage extends TSMSPMessage {
  userToken: string;
  other: UserName;
  constructor(userToken: string, other: UserName) {
    super();
    this.userToken = userToken;
    this.other = other;
  }
}
