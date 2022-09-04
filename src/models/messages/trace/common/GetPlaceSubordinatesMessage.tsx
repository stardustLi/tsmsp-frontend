import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class GetPlaceSubordinatesMessage extends TSMSPMessage {
  traceID: number;
  constructor(traceID: number) {
    super();
    this.traceID = traceID;
  }
}
