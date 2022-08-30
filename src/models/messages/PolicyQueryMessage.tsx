import { TSMSPMessage } from 'models/messages/TSMSPMessage';
import { Trace } from 'models/Trace';

export class PolicyQueryMessage extends TSMSPMessage {
  place: Trace;
  constructor(trace: Trace) {
    super();
    this.place = trace;
  }
}
