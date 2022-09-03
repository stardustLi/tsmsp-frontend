import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { NucleicAcidTestPointName, TraceID } from 'models/fields';

export class AddNucleicAcidTestPointMessage extends TSMSPMessage {
  userToken: string;
  place: TraceID;
  name: NucleicAcidTestPointName;
  constructor(
    userToken: string,
    place: TraceID,
    name: NucleicAcidTestPointName
  ) {
    super();
    this.userToken = userToken;
    this.place = place;
    this.name = name;
  }
}
