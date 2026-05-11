// import { useEffect, useState } from "react";
// import API from "../services/api";
// import socket from "../services/socket";

// function Analytics() {
//   const [analytics, setAnalytics] = useState({});

//   const fetchAnalytics = async () => {
//     const response = await API.get("/analytics");
//     setAnalytics(response.data);
//   };

//   useEffect(() => {
//     fetchAnalytics();

//     socket.on("timerUpdate", () => {
//       fetchAnalytics();
//     });

//     socket.on("numberPublished", () => {
//       fetchAnalytics();
//     });

//     return () => {
//       socket.off("timerUpdate");
//       socket.off("numberPublished");
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Live Analytics</h2>

//       {Object.keys(analytics).length === 0 ? (
//         <p>No selections yet</p>
//       ) : (
//         Object.entries(analytics).map(([number, count]) => (
//           <div key={number}>
//             Number {number} → {count} users
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Analytics;
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import socket from "../services/socket";

const COLORS = [
  "#a78bfa",
  "#60a5fa",
  "#34d399",
  "#fb7185",
  "#fbbf24",
  "#22c55e",
  "#f472b6",
  "#38bdf8",
  "#c084fc",
  "#f87171",
];

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const onAnalyticsUpdated = (next) => setData(next);

    socket.on("analyticsUpdated", onAnalyticsUpdated);
    return () => socket.off("analyticsUpdated", onAnalyticsUpdated);
  }, []);

  const numberRows = useMemo(() => {
    const totals = data?.numberTotals ?? {};
    const percentages = data?.percentages ?? {};

    return Array.from({ length: 10 }, (_, i) => {
      const key = String(i);
      const amount = Number(totals[key] ?? 0);
      const pct = Number(percentages[key] ?? 0);
      return {
        number: i,
        amount,
        pct,
      };
    });
  }, [data]);

  const topUsers = useMemo(() => {
    const userBets = data?.userBets ?? {};
    const entries = Object.entries(userBets);

    const scored = entries.map(([userId, bets]) => {
      const totalBet = Array.isArray(bets)
        ? bets.reduce((sum, b) => sum + Number(b?.betAmount ?? 0), 0)
        : 0;
      return { userId, totalBet, bets: Array.isArray(bets) ? bets : [] };
    });

    scored.sort((a, b) => b.totalBet - a.totalBet);
    return scored.slice(0, 6);
  }, [data]);

  if (!data) {
    return (
      <div className="analytics">
        <div className="section-box">
          <h2>Live Analytics</h2>
          <p className="page-subtitle">Waiting for live data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics">
      <div className="cards-grid">
        <div className="stat-card">
          <h3>Total Pool</h3>
          <h2>{data.totalPool ?? 0}</h2>
        </div>
        <div className="stat-card">
          <h3>Active Numbers</h3>
          <h2>
            {numberRows.filter((r) => r.amount > 0).length}/10
          </h2>
        </div>
        <div className="stat-card">
          <h3>Top Number</h3>
          <h2>
            {numberRows.reduce(
              (best, cur) => (cur.amount > best.amount ? cur : best),
              { number: 0, amount: -1 }
            ).number}
          </h2>
        </div>
      </div>

      <div className="two-col">
        <div className="section-box">
          <div className="section-head">
            <div>
              <h2>Number distribution</h2>
              <p className="page-subtitle">Points by selected number</p>
            </div>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={numberRows}>
                <XAxis dataKey="number" tick={{ fill: "rgba(255,255,255,0.8)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.8)" }} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    color: "white",
                  }}
                />
                <Bar dataKey="amount" radius={[12, 12, 0, 0]}>
                  {numberRows.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="section-box">
          <div className="section-head">
            <div>
              <h2>Share</h2>
              <p className="page-subtitle">Percentage share by number</p>
            </div>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    color: "white",
                  }}
                />
                <Pie
                  data={numberRows}
                  dataKey="pct"
                  nameKey="number"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={3}
                >
                  {numberRows.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="section-box">
        <div className="section-head">
          <div>
            <h2>Top user activity</h2>
            <p className="page-subtitle">Users with highest total bets</p>
          </div>
        </div>

        {topUsers.length === 0 ? (
          <p className="page-subtitle">No user bets yet.</p>
        ) : (
          <div className="grid-cards">
            {topUsers.map((u) => (
              <div className="mini-card" key={u.userId}>
                <div className="mini-card-row">
                  <div>
                    <div className="mini-card-title">{u.userId}</div>
                    <div className="list-muted">{u.bets.length} bets</div>
                  </div>
                  <div className="pill">Total: {u.totalBet}</div>
                </div>

                <div className="bet-chips">
                  {u.bets.slice(0, 8).map((b, idx) => (
                    <div className="chip" key={idx}>
                      #{b?.selectedNumber ?? "?"} · {b?.betAmount ?? 0}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;