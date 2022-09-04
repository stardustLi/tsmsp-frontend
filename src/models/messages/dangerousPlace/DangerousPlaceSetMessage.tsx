import { TSMSPMessage } from 'models/messages/TSMSPMessage';
import { Trace } from 'models/Trace';

export class DangerousPlaceSetMessage extends TSMSPMessage {
  place: Trace;
  riskLevel: Number;
  constructor(trace: Trace, riskLevel: Number) {
    super();
    this.place = trace;
    this.riskLevel = riskLevel;
  }
}
