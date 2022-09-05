import { TSMSPMessage } from 'models/messages/TSMSPMessage';
import {RiskLevel} from "models/RiskLevel.d";
import { Trace } from 'models/Trace';

export class DangerousPlaceSetMessage extends TSMSPMessage {
  userToken: string
  place: number;
  riskLevel: RiskLevel;
  constructor(userToken: string, place: number, riskLevel: RiskLevel) {
    super();
    this.userToken = userToken;
    this.place = place;
    this.riskLevel = riskLevel;
  }
}
