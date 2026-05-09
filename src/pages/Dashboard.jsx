import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ManualPublish from "../components/ManualPublish";
import PublishedNumbers from "../components/PublishedNumbers";
import Analytics from "../components/Analytics";

import { getAllUsers } from "../services/user.api";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await getAllUsers();

      setStats({
        totalUsers: response.total || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Admin Panel Dashboard</h1>

      {/* Quick Actions */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() =>
            navigate("/create-user")
          }
        >
          Create User
        </button>

        <button
          onClick={() =>
            navigate("/users")
          }
        >
          View Users
        </button>

        <button
          onClick={() =>
            navigate("/wallet")
          }
        >
          Wallet Actions
        </button>

        <button
          onClick={() =>
            navigate("/wallet-history")
          }
        >
          Wallet History
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2>System Stats</h2>

        <p>
          Total Users: {stats.totalUsers}
        </p>
      </div>

      <hr />

      {/* Old Existing Logic */}
      <ManualPublish />

      <hr />

      <PublishedNumbers />

      <hr />

      <Analytics />
    </div>
  );
}

export default Dashboard;