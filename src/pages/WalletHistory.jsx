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
    <div>
      <h2>Wallet History</h2>

      {history.map((item) => (
        <div key={item._id}>
          {item.amount}
        </div>
      ))}
    </div>
  );
}

export default WalletHistory;