import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { TraceID } from 'models/fields';

export class PolicyQueryMessage extends TSMSPMessage {
  place: TraceID;
  constructor(place: TraceID) {
    super();
    this.place = place;
  }
}
