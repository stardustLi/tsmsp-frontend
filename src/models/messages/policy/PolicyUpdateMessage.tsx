import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class PolicyUpdateMessage extends TSMSPMessage {
  userToken: string;
  place: number;
  content: string;
  constructor(userToken: string, place: number, content: string) {
    super();
    this.userToken = userToken;
    this.place = place;
    this.content = content;
  }
}
