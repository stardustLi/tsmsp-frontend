import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard } from 'models/fields';

export class UserAddTraceWithPeopleMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  cc: string;
  constructor(userToken: string, idCard: IDCard, cc: string) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.cc = cc;
  }
}
