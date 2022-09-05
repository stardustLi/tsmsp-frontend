import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { RiskLevel } from 'models/enums/RiskLevel';
import type { TraceID } from 'models/fields';

export class SetDangerousPlaceMessage extends TSMSPMessage {
  userToken: string;
  place: TraceID;
  level: RiskLevel;
  constructor(userToken: string, place: TraceID, level: RiskLevel) {
    super();
    this.userToken = userToken;
    this.place = place;
    this.level = level;
  }
}
