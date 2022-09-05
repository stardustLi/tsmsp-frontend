import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { IDCard } from 'models/fields';

export class UserAddVaccineMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  manufacture: string;
  time: number;
  constructor(
    userToken: string,
    idCard: IDCard,
    manufacture: string,
    time: number
  ) {
    super();
    this.userToken = userToken;
    this.manufacture = manufacture;
    this.time = time;
    this.idCard = idCard;
  }
}
