const STATUS_CLASS = {
  open: "pill-open",
  settled: "pill-ok",
  settling: "pill-warn",
  active: "pill-ok",
  won: "pill-ok",
  lost: "pill-bad",
  pending: "pill-warn",
};

function StatusBadge({ status }) {
  const key = String(status ?? "unknown").toLowerCase();
  const cls = STATUS_CLASS[key] ?? "";

  return <span className={`pill ${cls}`}>{status ?? "unknown"}</span>;
}

export default StatusBadge;
