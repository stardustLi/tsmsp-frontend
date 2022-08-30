import { TSMSPMessage } from 'models/messages/TSMSPMessage';
import { Trace } from 'models/Trace';

export class UserAddTraceMessage extends TSMSPMessage {
  userToken: string;
  idCard: string;
  trace: Trace;
  constructor(userToken: string, idCard: string, trace: Trace) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.trace = trace;
  }
}
