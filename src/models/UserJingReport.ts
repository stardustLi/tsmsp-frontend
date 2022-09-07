import type { IDCard } from 'models/fields';

export class UserJingReport {
  idCard: IDCard;
  reason: string;
  time: Date;

  constructor(idCard: IDCard, reason: string, time: number) {
    this.idCard = idCard;
    this.time = new Date(time);
    this.reason = reason;
  }
}

export interface RawUserJingReport extends Omit<UserJingReport, 'time'> {
  time: number;
}
