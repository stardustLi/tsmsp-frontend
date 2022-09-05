import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { TraceID } from 'models/fields';

export class DangerousPlaceMessage extends TSMSPMessage {
  place: TraceID;
  constructor(place: TraceID) {
    super();
    this.place = place;
  }
}
