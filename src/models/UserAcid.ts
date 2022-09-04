export class UserAcid {
  time: Date;
  testPlace: string;
  result: Boolean;
  constructor(testPlace: string, time: number, result: Boolean) {
    this.time = new Date(time);
    this.testPlace = testPlace;
    this.result = result;
  }
}

export interface RawUserAcid extends Omit<UserAcid, 'time'> {
  time: number;
}
