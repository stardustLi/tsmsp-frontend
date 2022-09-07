export class UserTraceWithPeople {
  CCUserName: string;
  time: Date;
  constructor(CCUserName: string, time: number) {
    this.CCUserName = CCUserName;
    this.time = new Date(time);
  }
}

export interface RawUserTraceWithPeople
  extends Omit<UserTraceWithPeople, 'time'> {
  time: number;
}
