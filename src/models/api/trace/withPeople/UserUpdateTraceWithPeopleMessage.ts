import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard } from 'models/fields';

export class UserUpdateTraceWithPeopleMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  time: number;
  cc: string;
  constructor(userToken: string, idCard: IDCard, time: number, cc: string) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.time = time;
    this.cc = cc;
  }
}
