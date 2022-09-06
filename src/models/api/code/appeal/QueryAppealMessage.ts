import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard } from 'models/fields';

export class QueryAppealMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  constructor(userToken: string, idCard: string) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
  }
}