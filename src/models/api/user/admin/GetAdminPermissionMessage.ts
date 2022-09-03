import { TSMSPMessage } from 'models/api/TSMSPMessage';

export class GetAdminPermissionMessage extends TSMSPMessage {
  userToken: string;
  constructor(userToken: string) {
    super();
    this.userToken = userToken;
  }
}
