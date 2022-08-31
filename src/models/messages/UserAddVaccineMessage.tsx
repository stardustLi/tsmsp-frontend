import { IDCard } from 'models/IDCard';
import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserAddVaccineMessage extends TSMSPMessage {
  userToken: string;
  manufacture: string;
  time: number;
  constructor(userToken: string, manufacture: string, time: number) {
    super();
    this.userToken = userToken;
    this.manufacture = manufacture;
    this.time = time;
  }
}
