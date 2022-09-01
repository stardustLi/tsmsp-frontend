export function range(l: number, r: number) {
  if (
    Number.isSafeInteger(l) &&
    Number.isSafeInteger(r) &&
    l <= r &&
    r - l < 16777216
  )
    return Array.from({ length: r - l + 1 }, (_, i) => l + i);
  throw new RangeError();
}

export function generateSelectItems(
  l: number,
  r: number,
  labelCallback: (v: number) => string
) {
  return range(l, r).map((item) => ({
    label: labelCallback(item),
    value: item.toString(),
  }));
}
