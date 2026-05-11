import { useState } from "react";
import API from "../services/api";

function ManualPublish() {
  const [number, setNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const publishNumber = async () => {
    if (number === "") return;

    try {
      setIsSubmitting(true);
      await API.post("/manual-publish", {
        number: Number(number),
      });
      setNumber("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-box">
      <div className="section-head">
        <div>
          <h2>Manual publish</h2>
          <p className="page-subtitle">
            Publish the next number instantly (0–9).
          </p>
        </div>
      </div>

      <div className="two-col">
        <input
          className="surface-input"
          type="number"
          min="0"
          max="9"
          value={number}
          placeholder="Enter number (0-9)"
          onChange={(e) => setNumber(e.target.value)}
        />

        <button className="btn" onClick={publishNumber} disabled={isSubmitting}>
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
}

export default ManualPublish;