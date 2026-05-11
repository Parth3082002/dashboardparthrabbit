import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ManualPublish from "../components/ManualPublish";
import PublishedNumbers from "../components/PublishedNumbers";
import Analytics from "../components/Analytics";

import { getAllUsers } from "../services/user.api";

import "../App.css";

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
    <div className="page">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, manage everything from here.</p>
        </div>
      </div>

      <div className="cards-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="stat-card">
          <h3>Active Status</h3>
          <h2>Online</h2>
        </div>

        <div className="stat-card">
          <h3>System Health</h3>
          <h2>100%</h2>
        </div>
      </div>

      <div className="quick-actions">
        <button
          className="action-btn"
          onClick={() => navigate("/create-user")}
        >
          Create User
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/users")}
        >
          View Users
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/wallet")}
        >
          Wallet Actions
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/wallet-history")}
        >
          Wallet History
        </button>
      </div>

      <div className="section-box">
        <ManualPublish />
      </div>

      <div className="section-box">
        <PublishedNumbers />
      </div>

      <div className="section-box">
        <Analytics />
      </div>
    </div>
  );
}

export default Dashboard;