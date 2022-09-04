import type { TraceLevel } from 'models/TraceLevel.d.ts';

export interface Trace {
  id: number;
  name: string;
  level: TraceLevel;
  parent: Trace | null;
}
