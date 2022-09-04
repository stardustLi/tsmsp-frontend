import { Trace } from './Trace';

export class DetailedTrace {
  approximatePlace: Trace;
  street: string;
  constructor(approximatePlace: Trace, street: string) {
    this.approximatePlace = approximatePlace;
    this.street = street;
  }
}
