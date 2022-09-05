import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserGetColorMessage extends TSMSPMessage {
  idCard: string;
  userToken: string;
  constructor(idCard: string, userToken: string) {
    super();
    this.idCard = idCard;
    this.userToken = userToken;
  }
}
