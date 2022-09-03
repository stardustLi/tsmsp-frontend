import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { TraceID } from 'models/fields';

export class GetPlaceSubordinatesMessage extends TSMSPMessage {
  traceID: TraceID;
  constructor(traceID: TraceID) {
    super();
    this.traceID = traceID;
  }
}
