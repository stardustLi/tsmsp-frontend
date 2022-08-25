import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserAddTraceMessage extends TSMSPMessage {
  userToken: string;
  trace: string;
  constructor(userToken: string, trace: string) {
    super();
    this.userToken = userToken;
    this.trace = trace;
  }
}
