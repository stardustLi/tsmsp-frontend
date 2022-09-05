export class NucleicAcidPoint {
  testPlace: string;
  constructor(testPlace: string) {
    this.testPlace = testPlace;
  }
}

export interface RawNucleicAcidPoint extends Omit<NucleicAcidPoint, 'time'> {
  time: number;
}
