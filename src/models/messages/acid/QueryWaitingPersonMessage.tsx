import { TSMSPMessage } from 'models/messages/TSMSPMessage';
import { DetailedTrace } from 'models/DetailedTrace';

export class QueryWaitingPersonMessage extends TSMSPMessage {
  place: DetailedTrace;
  constructor(place: DetailedTrace) {
    super();
    this.place = place;
  }
}
