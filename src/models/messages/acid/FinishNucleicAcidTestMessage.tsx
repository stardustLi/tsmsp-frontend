import { TSMSPMessage } from 'models/api/TSMSPMessage';

export class FinishNucleicAcidTestMessage extends TSMSPMessage {
  userToken: string;
  idCard: string;
  pointName: string;
  nucleicResult: boolean;
  constructor(userToken: string, idCard: string, pointName: string, nucleicResult: boolean) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.pointName = pointName;
    this.nucleicResult = nucleicResult;
  }
}
