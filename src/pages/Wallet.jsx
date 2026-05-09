import { useState } from "react";
import {
  depositWallet,
  withdrawWallet,
} from "../services/wallet.api";

function Wallet() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const deposit = async () => {
    await depositWallet({
      userId,
      amount: Number(amount),
    });
    alert("Deposited");
  };

  const withdraw = async () => {
    await withdrawWallet({
      userId,
      amount: Number(amount),
    });
    alert("Withdrawn");
  };

  return (
    <div>
      <h2>Wallet</h2>

      <input
        placeholder="User ID"
        onChange={(e) =>
          setUserId(e.target.value)
        }
      />

      <input
        placeholder="Amount"
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <button onClick={deposit}>
        Deposit
      </button>

      <button onClick={withdraw}>
        Withdraw
      </button>
    </div>
  );
}

export default Wallet;