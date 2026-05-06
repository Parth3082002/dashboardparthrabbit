import { useState } from "react";
import API from "../services/api";

function ManualPublish() {
  const [number, setNumber] = useState("");

  const publishNumber = async () => {
    if (number === "") return;

    await API.post("/manual-publish", {
      number: Number(number),
    });

    setNumber("");
  };

  return (
    <div>
      <h2>Manual Publish</h2>

      <input
        type="number"
        min="0"
        max="9"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={publishNumber}>
        Publish
      </button>
    </div>
  );
}

export default ManualPublish;