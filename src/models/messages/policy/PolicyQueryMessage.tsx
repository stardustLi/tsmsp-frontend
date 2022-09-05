import { TSMSPMessage } from 'models/messages/TSMSPMessage';
import { Trace } from 'models/Trace';

export class PolicyQueryMessage extends TSMSPMessage {
  place: number;
  constructor(trace: number) {
    super();
    this.place = trace;
  }
}
