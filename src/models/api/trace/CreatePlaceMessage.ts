import { TSMSPMessage } from 'models/api/TSMSPMessage';

export class CreatePlaceMessage extends TSMSPMessage {
  userToken: string;
  traceDescriptor: string[];
  constructor(userToken: string, traceDescriptor: string[]) {
    super();
    this.userToken = userToken;
    this.traceDescriptor = traceDescriptor;
  }
}
