import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import BackLink from "../components/BackLink";
import PageLoader from "../components/PageLoader";
import StatusBadge from "../components/StatusBadge";
import { getGameById } from "../services/admin.api";
import { formatDate, formatMoney } from "../utils/format";

function normalizeStakeRows(stakeData) {
  if (!stakeData) return [];
  if (Array.isArray(stakeData)) {
    return stakeData.map((row) => ({
      number: row.number ?? row.selected_number ?? row.key,
      stake: row.stake ?? row.totalStake ?? row.amount ?? 0,
    }));
  }
  return Object.entries(stakeData).map(([number, stake]) => ({
    number,
    stake: stake?.stake ?? stake?.total ?? stake ?? 0,
  }));
}

function GameDetail() {
  const { gameId } = useParams();
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getGameById(gameId);
        setPayload(response);
      } catch (err) {
        console.error(err);
        setError("Could not load game details.");
      } finally {
        setLoading(false);
      }
    };
    if (gameId) load();
  }, [gameId]);

  const game = payload?.game ?? payload;
  const stats = payload?.stats ?? game ?? {};
  const stakeRows = useMemo(
    () =>
      normalizeStakeRows(
        payload?.stakeByNumber ??
          payload?.stakeBreakdown ??
          payload?.stakesByNumber ??
          payload?.stake_by_number
      ),
    [payload]
  );
  const bets = payload?.bets ?? [];

  if (loading) {
    return (
      <div className="page">
        <BackLink to="/games">Games</BackLink>
        <PageLoader label="Loading round…" />
      </div>
    );
  }

  if (error || !game?.id) {
    return (
      <div className="page">
        <BackLink to="/games">Games</BackLink>
        <p className="page-subtitle">{error || "Game not found."}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <BackLink to="/games">Games</BackLink>

      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>{game.game_name ?? "Round"}</h1>
          <p className="page-subtitle">ID: {game.id}</p>
        </div>
        <StatusBadge status={game.status} />
      </div>

      <div className="cards-grid">
        <div className="stat-card">
          <h3>Bets</h3>
          <h2>{stats.betCount ?? game.betCount ?? 0}</h2>
        </div>
        <div className="stat-card">
          <h3>Total stake</h3>
          <h2>{formatMoney(stats.totalStake ?? game.totalStake)}</h2>
        </div>
        <div className="stat-card">
          <h3>Unique bettors</h3>
          <h2>{stats.uniqueBettors ?? game.uniqueBettors ?? 0}</h2>
        </div>
        <div className="stat-card">
          <h3>Won / Lost</h3>
          <h2>
            {stats.wonCount ?? game.wonCount ?? 0} / {stats.lostCount ?? game.lostCount ?? 0}
          </h2>
        </div>
      </div>

      <div className="section-box">
        <h2>Round info</h2>
        <div className="kv-grid">
          <div className="kv-item">
            <span className="kv-label">Created</span>
            <span>{formatDate(game.created_at)}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Published #</span>
            <span>{game.published_number ?? "—"}</span>
          </div>
          <div className="kv-item">
            <span className="kv-label">Published at</span>
            <span>{formatDate(game.published_at)}</span>
          </div>
        </div>
      </div>

      <div className="section-box">
        <div className="section-head">
          <div>
            <h2>Stake by number</h2>
            <p className="page-subtitle">Distribution across 0–9</p>
          </div>
        </div>
        {stakeRows.length === 0 ? (
          <p className="page-subtitle">No stakes recorded.</p>
        ) : (
          <div className="stake-grid">
            {stakeRows.map((row) => (
              <div className="stake-cell" key={row.number}>
                <span className="stake-num">#{row.number}</span>
                <span className="stake-amt">{formatMoney(row.stake)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section-box">
        <div className="section-head">
          <div>
            <h2>All bets</h2>
            <p className="page-subtitle">{bets.length} bet(s) in this round</p>
          </div>
        </div>

        {bets.length === 0 ? (
          <p className="page-subtitle">No bets for this round.</p>
        ) : (
          <>
            <div className="mobile-only entity-list">
              {bets.map((bet, idx) => (
                <div className="entity-card entity-card--static" key={bet.id ?? idx}>
                  <div className="entity-card-head">
                    <div>
                      <div className="entity-card-title">
                        {bet.user_id ?? bet.userId ?? "User"}
                      </div>
                      <div className="list-muted">{bet.phone ?? bet.phone_number ?? "—"}</div>
                    </div>
                    <StatusBadge status={bet.status} />
                  </div>
                  <div className="entity-stats">
                    <div className="entity-stat">
                      <span className="entity-stat-label">Number</span>
                      <span className="entity-stat-value">
                        #{bet.selected_number ?? bet.number ?? "—"}
                      </span>
                    </div>
                    <div className="entity-stat">
                      <span className="entity-stat-label">Stake</span>
                      <span className="entity-stat-value">
                        {formatMoney(bet.amount ?? bet.stake ?? bet.bet_amount)}
                      </span>
                    </div>
                    <div className="entity-stat">
                      <span className="entity-stat-label">Payout</span>
                      <span className="entity-stat-value">
                        {formatMoney(bet.payout ?? bet.win_amount ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="desktop-only table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Phone</th>
                    <th>Number</th>
                    <th>Stake</th>
                    <th>Status</th>
                    <th>Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {bets.map((bet, idx) => (
                    <tr key={bet.id ?? idx}>
                      <td>{bet.user_id ?? bet.userId ?? "—"}</td>
                      <td>{bet.phone ?? bet.phone_number ?? "—"}</td>
                      <td>#{bet.selected_number ?? bet.number ?? "—"}</td>
                      <td>{formatMoney(bet.amount ?? bet.stake ?? bet.bet_amount)}</td>
                      <td>
                        <StatusBadge status={bet.status} />
                      </td>
                      <td>{formatMoney(bet.payout ?? bet.win_amount ?? 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GameDetail;
