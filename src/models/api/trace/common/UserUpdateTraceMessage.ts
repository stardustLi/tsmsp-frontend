import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard, TraceID } from 'models/fields';

export class UserUpdateTraceMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  time: number;
  trace: TraceID;
  constructor(userToken: string, idCard: IDCard, time: number, trace: TraceID) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.time = time;
    this.trace = trace;
  }
}
