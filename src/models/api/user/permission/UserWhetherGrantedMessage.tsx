import { TSMSPMessage } from 'models/api/TSMSPMessage';

export class UserWhetherGrantedMessage extends TSMSPMessage {
  userToken: string;
  idCard: string;
  constructor(userToken: string, idCard: string) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
  }
}
