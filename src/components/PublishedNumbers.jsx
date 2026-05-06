import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";

function PublishedNumbers() {
  const [numbers, setNumbers] = useState([]);

  const fetchHistory = async () => {
    const response = await API.get(
      "/published-history"
    );
    setNumbers(response.data);
  };

  useEffect(() => {
    fetchHistory();

    socket.on("numberPublished", () => {
      fetchHistory();
    });

    return () => {
      socket.off("numberPublished");
    };
  }, []);

  return (
    <div>
      <h2>Published Numbers</h2>

      {numbers.length === 0 ? (
        <p>No published numbers yet</p>
      ) : (
        numbers.map((num, index) => (
          <div key={index}>
            Round {numbers.length - index} → {num}
          </div>
        ))
      )}
    </div>
  );
}

export default PublishedNumbers;