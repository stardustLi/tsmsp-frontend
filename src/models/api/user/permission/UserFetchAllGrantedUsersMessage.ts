import { TSMSPMessage } from 'models/api/TSMSPMessage';

export class UserFetchAllGrantedUsersMessage extends TSMSPMessage {
  userToken: string;
  constructor(userToken: string) {
    super();
    this.userToken = userToken;
  }
}
