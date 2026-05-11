import { useEffect, useState } from "react";
import { getWalletHistory } from "../services/wallet.api";

function WalletHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const response = await getWalletHistory();
    setHistory(response.history || []);
  };

  return (
    <div className="page">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Wallet history</h1>
          <p>Recent wallet transactions.</p>
        </div>
      </div>

      <div className="section-box">
        {history.length === 0 ? (
          <p className="page-subtitle">No history yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <span className="pill">
                        {item.type ?? "tx"}
                      </span>
                    </td>
                    <td>{item.userId ?? item.user_id ?? "-"}</td>
                    <td>{item.amount ?? 0}</td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletHistory;