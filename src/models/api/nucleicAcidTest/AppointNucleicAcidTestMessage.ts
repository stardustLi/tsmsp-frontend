import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard, NucleicAcidTestPointName } from 'models/fields';

export class AppointNucleicAcidTestMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  testPlace: NucleicAcidTestPointName;
  constructor(
    userToken: string,
    idCard: IDCard,
    testPlace: NucleicAcidTestPointName
  ) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.testPlace = testPlace;
  }
}
