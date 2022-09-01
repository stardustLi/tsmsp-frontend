import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserFetchAllGrantedUsersMessage extends TSMSPMessage {
  userToken: string;
  constructor(userToken: string) {
    super();
    this.userToken = userToken;
  }
}
