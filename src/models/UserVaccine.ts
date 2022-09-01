export class UserVaccine {
  manufacture: string;
  time: Date;
  vaccineType: number;
  constructor(manufactore: string, time: number, vaccineType: number) {
    this.manufacture = manufactore;
    this.time = new Date(time);
    this.vaccineType = vaccineType;
  }
}

export interface RawUserVaccine extends Omit<UserVaccine, 'time'> {
  time: number;
}
