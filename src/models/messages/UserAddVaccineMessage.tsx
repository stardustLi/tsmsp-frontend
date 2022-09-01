import { IDCard } from 'models/IDCard';
import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserAddVaccineMessage extends TSMSPMessage {
  userToken: string;
  manufacture: string;
  time: number;
  idCard: IDCard;
  constructor(userToken: string, manufacture: string, time: number, idCard: IDCard) {
    super();
    this.userToken = userToken;
    this.manufacture = manufacture;
    this.time = time;
    this.idCard = idCard;
  }
}
