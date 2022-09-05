import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { NucleicAcidTestPointName } from 'models/fields';

export class AdminQueryTestPointWaitingPersonMessage extends TSMSPMessage {
  userToken: string;
  place: NucleicAcidTestPointName;
  constructor(userToken: string, place: NucleicAcidTestPointName) {
    super();
    this.userToken = userToken;
    this.place = place;
  }
}
