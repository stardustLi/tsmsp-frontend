import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserAddTraceWithPeopleMessage extends TSMSPMessage {
  userToken: string;
  idCard: string;
  personIdCard: string;
  constructor(userToken: string, idCard: string, personIdCard: string) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.personIdCard = personIdCard;
  }
}
