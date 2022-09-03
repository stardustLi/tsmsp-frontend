import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard, TraceID } from 'models/fields';

export class UserAddTraceMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  trace: TraceID;
  constructor(userToken: string, idCard: IDCard, trace: TraceID) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.trace = trace;
  }
}
