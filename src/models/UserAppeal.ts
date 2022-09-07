import type { IDCard } from 'models/fields';
import { date2datestr, zonedDate } from 'utils/date';

export class UserAppeal {
  idCard: IDCard;
  reason: string;
  time: Date;

  constructor(idCard: IDCard, reason: string, time: number) {
    this.idCard = idCard;
    this.time = new Date(time);
    this.reason = reason;
  }
}

export interface RawUserAppeal extends Omit<UserAppeal, 'time'> {
  time: number;
}

export function serializeAppeal(appeal: UserAppeal) {
  return `时间：${date2datestr(zonedDate(appeal.time))}\n原因：${appeal.reason}`
}