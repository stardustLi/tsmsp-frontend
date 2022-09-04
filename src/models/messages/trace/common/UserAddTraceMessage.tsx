import { TSMSPMessage } from 'models/messages/TSMSPMessage';
import { Trace } from 'models/Trace';

export class UserAddTraceMessage extends TSMSPMessage {
  userToken: string;
  idCard: string;
  trace: number;
  constructor(userToken: string, idCard: string, trace: number) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.trace = trace;
  }
}
