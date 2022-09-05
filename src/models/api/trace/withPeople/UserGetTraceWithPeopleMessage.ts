import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard } from 'models/fields';

export class UserGetTraceWithPeopleMessage extends TSMSPMessage {
  userToken: string;
  idCard: string;
  startTime: number;
  endTime: number;
  constructor(
    userToken: string,
    idCard: string,
    startTime: number,
    endTime: number
  ) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
