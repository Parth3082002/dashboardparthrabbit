import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ManualPublish from "../components/ManualPublish";
import PublishedNumbers from "../components/PublishedNumbers";
import Analytics from "../components/Analytics";
import PageLoader from "../components/PageLoader";
import StatusBadge from "../components/StatusBadge";

import { getDashboard } from "../services/admin.api";
import { formatDate } from "../utils/format";

import "../App.css";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await getDashboard();
      setDashboard(response.dashboard ?? response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openGame = dashboard?.currentOpenGame;

  return (
    <div className="page">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Admin Dashboard</h1>
          <p>Overview of users, rounds, and betting activity.</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={fetchDashboard}>
          Refresh
        </button>
      </div>

      {loading ? (
        <PageLoader label="Loading dashboard…" />
      ) : (
        <>
          <div className="cards-grid">
            <div className="stat-card">
              <h3>Total Users</h3>
              <h2>{dashboard?.totalUsers ?? 0}</h2>
            </div>
            <div className="stat-card">
              <h3>Total Games</h3>
              <h2>{dashboard?.totalGames ?? 0}</h2>
            </div>
            <div className="stat-card">
              <h3>Pending Bets</h3>
              <h2>{dashboard?.pendingBetsCount ?? 0}</h2>
            </div>
          </div>

          <div className="two-col">
            <div className="section-box">
              <div className="section-head">
                <div>
                  <h2>Current open round</h2>
                  <p className="page-subtitle">Live game accepting bets</p>
                </div>
                {openGame && <StatusBadge status="open" />}
              </div>

              {!openGame ? (
                <p className="page-subtitle">No open round right now.</p>
              ) : (
                <div className="detail-card">
                  <div className="detail-card-title">{openGame.game_name}</div>
                  <div className="detail-meta">
                    <span>Started {formatDate(openGame.created_at)}</span>
                  </div>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => navigate(`/games/${openGame.id}`)}
                  >
                    View round
                  </button>
                </div>
              )}
            </div>

            <div className="section-box">
              <div className="section-head">
                <div>
                  <h2>Recent settled</h2>
                  <p className="page-subtitle">Last 5 completed rounds</p>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate("/games?status=settled")}
                >
                  All games
                </button>
              </div>

              {(dashboard?.recentSettledGames ?? []).length === 0 ? (
                <p className="page-subtitle">No settled games yet.</p>
              ) : (
                <div className="history-list">
                  {(dashboard.recentSettledGames ?? []).map((game) => (
                    <button
                      type="button"
                      key={game.id}
                      className="history-row history-row--clickable"
                      onClick={() => navigate(`/games/${game.id}`)}
                    >
                      <div>
                        <div className="mini-card-title">{game.game_name}</div>
                        <div className="list-muted">
                          {formatDate(game.published_at ?? game.created_at)}
                        </div>
                      </div>
                      <div className="history-value">#{game.published_number ?? "—"}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="quick-actions">
        <button type="button" className="action-btn" onClick={() => navigate("/games")}>
          Game history
        </button>
        <button type="button" className="action-btn" onClick={() => navigate("/users")}>
          View users
        </button>
        <button type="button" className="action-btn" onClick={() => navigate("/create-user")}>
          Create user
        </button>
        <button type="button" className="action-btn" onClick={() => navigate("/wallet")}>
          Wallet actions
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
