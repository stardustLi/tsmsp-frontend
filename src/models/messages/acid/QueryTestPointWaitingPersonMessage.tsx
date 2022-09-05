import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class QueryTestPointWaitingPersonMessage extends TSMSPMessage {
  place: string;
  constructor(place: string) {
    super();
    this.place = place;
  }
}
