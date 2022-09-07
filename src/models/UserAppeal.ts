import type { IDCard } from 'models/fields';

export class UserAppeal {
  idCard: IDCard
  time: Date;
  reason: string
  constructor(idCard: IDCard, time: number, reason: string) {
    this.idCard = idCard;
    this.time = new Date(time);
    this.reason = reason;
  }
}

export interface RawUserAppeal extends Omit<UserAppeal, 'time'> {
  time: number;
}
