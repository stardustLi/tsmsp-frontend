import { IDCard } from 'models/IDCard';
import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserAddTraceMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  manufacture: string;
  now: Date;
  vaccineType: number;
  constructor(
    userToken: string,
    idCard: IDCard,
    manufacture: string,
    now: Date,
    vaccineType: number
  ) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.manufacture = manufacture;
    this.now = new Date();
    this.vaccineType = vaccineType;
  }
}
