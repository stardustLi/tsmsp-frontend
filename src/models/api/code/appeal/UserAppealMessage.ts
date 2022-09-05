import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard } from 'models/fields';

export class UserAppealMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  reason: string;
  constructor(userToken: string, idCard: IDCard, reason: string) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.reason = reason;
  }
}
