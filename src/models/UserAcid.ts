export class UserAcid {
  time: Date;
  testPlace: string;
  result: boolean;
  constructor(testPlace: string, time: number, result: boolean) {
    this.time = new Date(time);
    this.testPlace = testPlace;
    this.result = result;
  }
}

export interface RawUserAcid extends Omit<UserAcid, 'time'> {
  time: number;
}
