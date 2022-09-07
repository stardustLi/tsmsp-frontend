export class UserAppeal {
  time: Date;
  reason: string;
  constructor(time: number, reason: string) {
    this.time = new Date(time);
    this.reason = reason;
  }
}

export interface RawUserAppeal extends Omit<UserAppeal, 'time'> {
  time: number;
}
