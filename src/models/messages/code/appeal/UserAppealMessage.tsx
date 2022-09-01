import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserAppealMessage extends TSMSPMessage {
  idCard: string;
  reason: string;
  userToken: string;
  constructor(idCard: string, reason: string, userToken: string) {
    super();
    this.idCard = idCard;
    this.reason = reason;
    this.userToken = userToken;
  }
}
