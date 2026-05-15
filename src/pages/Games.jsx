import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import PageLoader from "../components/PageLoader";
import StatusBadge from "../components/StatusBadge";
import { getGames } from "../services/admin.api";
import { formatDate, formatMoney } from "../utils/format";

const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "open", label: "Open" },
  { value: "settling", label: "Settling" },
  { value: "settled", label: "Settled" },
];

const PAGE_SIZE = 20;

function Games() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") ?? "";
  const offset = Number(searchParams.get("offset") ?? 0);

  const [games, setGames] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);
      const params = { limit: PAGE_SIZE, offset };
      if (status) params.status = status;

      const response = await getGames(params);
      setGames(response.games ?? []);
      setTotal(response.total ?? 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [status, offset]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const setFilter = (nextStatus) => {
    const next = new URLSearchParams(searchParams);
    if (nextStatus) next.set("status", nextStatus);
    else next.delete("status");
    next.set("offset", "0");
    setSearchParams(next);
  };

  const goPage = (nextOffset) => {
    const next = new URLSearchParams(searchParams);
    next.set("offset", String(Math.max(0, nextOffset)));
    setSearchParams(next);
  };

  const page = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hasPrev = offset > 0;
  const hasNext = offset + PAGE_SIZE < total;

  return (
    <div className="page">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Games</h1>
          <p>Round history with bet stats per game.</p>
        </div>
      </div>

      <div className="filter-bar">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value || "all"}
            type="button"
            className={`filter-chip ${status === opt.value ? "filter-chip--active" : ""}`}
            onClick={() => setFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {loading ? (
        <PageLoader label="Loading games…" />
      ) : games.length === 0 ? (
        <div className="section-box">
          <p className="page-subtitle">No games found for this filter.</p>
        </div>
      ) : (
        <div className="entity-list">
          {games.map((game) => (
            <button
              type="button"
              key={game.id}
              className="entity-card"
              onClick={() => navigate(`/games/${game.id}`)}
            >
              <div className="entity-card-head">
                <div>
                  <div className="entity-card-title">{game.game_name}</div>
                  <div className="list-muted">{formatDate(game.created_at)}</div>
                </div>
                <StatusBadge status={game.status} />
              </div>

              <div className="entity-stats">
                <div className="entity-stat">
                  <span className="entity-stat-label">Bets</span>
                  <span className="entity-stat-value">{game.betCount ?? 0}</span>
                </div>
                <div className="entity-stat">
                  <span className="entity-stat-label">Stake</span>
                  <span className="entity-stat-value">{formatMoney(game.totalStake)}</span>
                </div>
                <div className="entity-stat">
                  <span className="entity-stat-label">Bettors</span>
                  <span className="entity-stat-value">{game.uniqueBettors ?? 0}</span>
                </div>
                <div className="entity-stat">
                  <span className="entity-stat-label">W / L</span>
                  <span className="entity-stat-value">
                    {game.wonCount ?? 0} / {game.lostCount ?? 0}
                  </span>
                </div>
              </div>

              {game.published_number != null && (
                <div className="entity-footer">
                  Result <strong>#{game.published_number}</strong>
                  {game.published_at && (
                    <span className="list-muted"> · {formatDate(game.published_at)}</span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {!loading && total > 0 && (
        <div className="pagination-bar">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            disabled={!hasPrev}
            onClick={() => goPage(offset - PAGE_SIZE)}
          >
            Previous
          </button>
          <span className="list-muted">
            Page {page} of {totalPages} · {total} total
          </span>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            disabled={!hasNext}
            onClick={() => goPage(offset + PAGE_SIZE)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Games;
