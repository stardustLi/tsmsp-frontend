import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserUpdateTraceMessage extends TSMSPMessage {
  userToken: string;
  time: number;
  trace: string;
  constructor(userToken: string, time: number, trace: string) {
    super();
    this.userToken = userToken;
    this.time = time;
    this.trace = trace;
  }
}
