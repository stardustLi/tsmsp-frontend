import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { TraceID } from 'models/fields';

export class PolicyUpdateMessage extends TSMSPMessage {
  userToken: string;
  place: TraceID;
  content: string;
  constructor(userToken: string, place: TraceID, content: string) {
    super();
    this.userToken = userToken;
    this.place = place;
    this.content = content;
  }
}
