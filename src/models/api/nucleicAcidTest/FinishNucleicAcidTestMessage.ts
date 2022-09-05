import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard, NucleicAcidTestPointName } from 'models/fields';

export class FinishNucleicAcidTestMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  testPlace: NucleicAcidTestPointName;
  nucleicResult: boolean;
  constructor(
    userToken: string,
    idCard: IDCard,
    testPlace: NucleicAcidTestPointName,
    nucleicResult: boolean
  ) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.testPlace = testPlace;
    this.nucleicResult = nucleicResult;
  }
}
