import { TSMSPMessage } from 'models/messages/TSMSPMessage';

export class UserPolicyInquiryMessage extends TSMSPMessage {
  idCard: string;
  reason: string;
  userToken: string;
  constructor(idCard: string, reason: string, userToken: string) {
    super();
    this.idCard = idCard;
    this.reason = reason;
    this.userToken = userToken;
  }
}
