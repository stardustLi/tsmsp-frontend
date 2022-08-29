import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserAppealMessage extends TSMSPMessage {
  realname: string;
  idcard: string;
  reason: String;
  constructor(realname:string, idcard: string, reason: string) {
    super();
    this.realname = realname;
    this.idcard = idcard;
    this.reason = reason;
  }
}
