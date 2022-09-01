import { Trace } from 'models/Trace';

export class UserTrace {
  trace: Trace;
  time: Date;
  constructor(trace: Trace, time: number) {
    this.trace = trace;
    this.time = new Date(time);
  }
}

export interface RawUserTrace extends Omit<UserTrace, 'time'> {
  time: number;
}
