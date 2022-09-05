import { TSMSPMessage } from 'models/api/TSMSPMessage';
import type { CodeColor } from 'models/enums/CodeColor';
import type { IDCard } from 'models/fields';

export class AdminSetColorMessage extends TSMSPMessage {
  userToken: string;
  idCard: IDCard;
  color: CodeColor;
  constructor(userToken: string, idCard: IDCard, color: CodeColor) {
    super();
    this.userToken = userToken;
    this.idCard = idCard;
    this.color = color;
  }
}
