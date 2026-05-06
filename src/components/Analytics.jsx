import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";

function Analytics() {
  const [analytics, setAnalytics] = useState({});

  const fetchAnalytics = async () => {
    const response = await API.get("/analytics");
    setAnalytics(response.data);
  };

  useEffect(() => {
    fetchAnalytics();

    socket.on("timerUpdate", () => {
      fetchAnalytics();
    });

    socket.on("numberPublished", () => {
      fetchAnalytics();
    });

    return () => {
      socket.off("timerUpdate");
      socket.off("numberPublished");
    };
  }, []);

  return (
    <div>
      <h2>Live Analytics</h2>

      {Object.keys(analytics).length === 0 ? (
        <p>No selections yet</p>
      ) : (
        Object.entries(analytics).map(([number, count]) => (
          <div key={number}>
            Number {number} → {count} users
          </div>
        ))
      )}
    </div>
  );
}

export default Analytics;