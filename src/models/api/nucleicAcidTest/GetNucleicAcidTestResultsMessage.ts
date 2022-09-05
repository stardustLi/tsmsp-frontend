import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard } from 'models/fields';

export class GetNucleicAcidTestResultsMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  constructor(userToken: string, idCard: IDCard) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
  }
}
