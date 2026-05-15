export function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString();
}

export function formatMoney(value) {
  const n = Number(value ?? 0);
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function shortId(id) {
  if (!id) return "—";
  const s = String(id);
  return s.length > 12 ? `${s.slice(0, 8)}…` : s;
}
