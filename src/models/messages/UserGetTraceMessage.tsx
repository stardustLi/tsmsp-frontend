import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserGetTraceMessage extends TSMSPMessage {
  userToken: string;
  idCard: string;
  startTime: number;
  endTime: number;
  constructor(userToken: string, idCard: string, startTime: number, endTime: number) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
