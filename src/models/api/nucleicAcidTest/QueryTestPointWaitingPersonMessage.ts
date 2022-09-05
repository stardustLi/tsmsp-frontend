import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { NucleicAcidTestPointName } from 'models/fields';

export class QueryTestPointWaitingPersonMessage extends TSMSPMessage {
  place: NucleicAcidTestPointName;
  constructor(place: NucleicAcidTestPointName) {
    super();
    this.place = place;
  }
}
