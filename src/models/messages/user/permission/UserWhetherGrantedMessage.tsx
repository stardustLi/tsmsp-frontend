import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserWhetherGrantedMessage extends TSMSPMessage {
  userToken: string;
  idCard: string;
  constructor(userToken: string, idCard: string) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
  }
}