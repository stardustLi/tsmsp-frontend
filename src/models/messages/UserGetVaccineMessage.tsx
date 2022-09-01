import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserGetVaccineMessage extends TSMSPMessage {
  userToken: string;
  idCard: string;
  constructor(userToken: string, idCard: string) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
  }
}
