import { TSMSPMessage } from 'models/messages/TSMSPMessage';
import { Trace } from 'models/Trace';

export class UserUpdateTraceMessage extends TSMSPMessage {
  userToken: string;
  time: number;
  idCard: string;
  trace: number;
  constructor(userToken: string, time: number, idCard: string, trace: number) {
    super();
    this.userToken = userToken;
    this.time = time;
    this.idCard = idCard;
    this.trace = trace;
  }
}
