import { TSMSPMessage } from 'models/messages/TSMSPMessage';
import { Trace } from 'models/Trace';

export class AddNucleicAcidTestPointMessage extends TSMSPMessage {
  userToken: string;
  trace: number;
  pointName: string;
  constructor(userToken: string, trace: number, pointName: string) {
    super();
    this.userToken = userToken;
    this.trace = trace;
    this.pointName = pointName;
  }
}
