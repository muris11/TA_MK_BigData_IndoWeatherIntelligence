const idNumber = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 2,
});

const idCompact = new Intl.NumberFormat("id-ID", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const idPercent = new Intl.NumberFormat("id-ID", {
  style: "percent",
  maximumFractionDigits: 2,
});

export function formatNumber(value: number | string | null | undefined, digits = 2) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: digits }).format(number);
}

export function formatCompact(value: number | string | null | undefined) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return idCompact.format(number);
}

export function formatPercent(value: number | string | null | undefined) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return idPercent.format(number);
}

export function formatMm(value: number | string | null | undefined) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return `${idNumber.format(number)} mm`;
}

export function formatTemperature(value: number | string | null | undefined) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return `${idNumber.format(number)} C`;
}

export function formatMb(value: number | string | null | undefined) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return `${idNumber.format(number)} MB`;
}

export function titleCase(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.slice(1));
}
