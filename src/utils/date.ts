export const months = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
];

export const days= [
  '1日',
  '2日',
  '3日',
  '4日',
  '5日',
  '6日',
  '7日',
  '8日',
  '9日',
  '10日',
  '11日',
  '12日',
  '13日',
  '14日',
  '15日',
  '16日',
  '17日',
  '18日',
  '19日',
  '20日',
  '21日',
  '22日',
  '23日',
  '24日',
  '25日',
  '26日',
  '27日',
  '28日',
  '29日',
  '30日',
  '31日',
];

export function date2datestr(date: Date, UTC?: boolean) {
  return UTC
    ? `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
    : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function date2timestr(date: Date, UTC?: boolean) {
  return UTC
    ? `${date.getUTCHours()}:${date
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}`
    : `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

export function date2str(date: Date, UTC?: boolean) {
  return date2datestr(date, UTC) + ' ' + date2timestr(date, UTC);
}
