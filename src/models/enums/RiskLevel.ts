export enum RiskLevel {
  LOW,
  MEDIUM,
  HIGH,
}

export function RiskLevelConverter(message: string) {
  if (message == '0') return '低';
  else if (message == '1') return '中';
  else if (message == '2') return '高';
  else return '';
}
