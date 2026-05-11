import { useState } from "react";
import {
  depositWallet,
  withdrawWallet,
} from "../services/wallet.api";

function Wallet() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deposit = async () => {
    try {
      setIsSubmitting(true);
      await depositWallet({
        userId,
        amount: Number(amount),
      });
      alert("Deposited");
    } finally {
      setIsSubmitting(false);
    }
  };

  const withdraw = async () => {
    try {
      setIsSubmitting(true);
      await withdrawWallet({
        userId,
        amount: Number(amount),
      });
      alert("Withdrawn");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Wallet</h1>
          <p>Deposit or withdraw user balance.</p>
        </div>
      </div>

      <div className="section-box">
        <div className="stack">
          <div className="two-col">
            <div className="stack">
              <label className="form-label">User ID</label>
              <input
                className="surface-input"
                placeholder="Enter user id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div className="stack">
              <label className="form-label">Amount</label>
              <input
                className="surface-input"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="actions-row">
            <button className="btn" onClick={deposit} disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Deposit"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={withdraw}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Withdraw"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;