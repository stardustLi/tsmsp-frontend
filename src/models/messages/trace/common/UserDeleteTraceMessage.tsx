import { TSMSPMessage } from 'models/messages/TSMSPMessage';
import { Trace } from 'models/Trace';

export class UserDeleteTraceMessage extends TSMSPMessage {
  userToken: string;
  idCard: string;
  time: number;
  constructor(userToken: string, idCard: string, time: number) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.time = time;
  }
}
