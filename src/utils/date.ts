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

export function zonedDate(date: Date) {
  return new Date(date.getTime() + 0);
}
