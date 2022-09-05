import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard } from 'models/fields';

export class UserDeleteTraceWithPeopleMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  time: number;
  constructor(userToken: string, idCard: IDCard, time: number) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.time = time;
  }
}
