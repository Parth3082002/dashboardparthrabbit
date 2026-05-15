import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BackLink from "../components/BackLink";
import PageLoader from "../components/PageLoader";
import StatusBadge from "../components/StatusBadge";
import { getUserById } from "../services/user.api";
import { formatDate, formatMoney } from "../utils/format";

function UserProfile() {
  const { userId } = useParams();
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getUserById(userId);
        setPayload(response);
      } catch (err) {
        console.error(err);
        setError("Could not load user report.");
      } finally {
        setLoading(false);
      }
    };
    if (userId) load();
  }, [userId]);

  const user = payload?.user ?? payload;
  const wallet = payload?.wallet ?? user?.wallet ?? user?.wallets ?? {};
  const financials = payload?.financials ?? {};
  const betting = payload?.betting ?? {};
  const walletTransactions = payload?.walletTransactions ?? [];
  const bets = payload?.bets ?? [];

  const publicId = user?.user_id ?? user?.userId ?? userId;

  if (loading) {
    return (
      <div className="page">
        <BackLink to="/users">Users</BackLink>
        <PageLoader label="Loading user…" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="page">
        <BackLink to="/users">Users</BackLink>
        <p className="page-subtitle">{error || "User not found."}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <BackLink to="/users">Users</BackLink>

      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>{publicId}</h1>
          <p>{user.phone_number ?? user.phoneNumber ?? "No phone"}</p>
        </div>
        <StatusBadge status={user.status} />
      </div>

      <div className="cards-grid">
        <div className="stat-card">
          <h3>Wallet balance</h3>
          <h2>{formatMoney(wallet.balance ?? user.balance)}</h2>
        </div>
        <div className="stat-card">
          <h3>Total bets</h3>
          <h2>{betting.totalBets ?? 0}</h2>
        </div>
        <div className="stat-card">
          <h3>Net from bets</h3>
          <h2>{formatMoney(betting.netFromBets)}</h2>
        </div>
      </div>

      <div className="two-col">
        <div className="section-box">
          <h2>Financials</h2>
          <div className="kv-grid">
            <div className="kv-item">
              <span className="kv-label">Deposits</span>
              <span>{formatMoney(financials.totalDeposit)}</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">Withdrawals</span>
              <span>{formatMoney(financials.totalWithdraw)}</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">Bet stake</span>
              <span>{formatMoney(financials.totalBetStake)}</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">Bet winnings</span>
              <span>{formatMoney(financials.totalBetWinnings)}</span>
            </div>
          </div>
        </div>

        <div className="section-box">
          <h2>Betting summary</h2>
          <div className="kv-grid">
            <div className="kv-item">
              <span className="kv-label">Total staked</span>
              <span>{formatMoney(betting.totalStaked)}</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">Won / Lost</span>
              <span>
                {betting.wonCount ?? 0} / {betting.lostCount ?? 0}
              </span>
            </div>
            <div className="kv-item">
              <span className="kv-label">Won payout</span>
              <span>{formatMoney(betting.totalWonPayout)}</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">Lost stake</span>
              <span>{formatMoney(betting.totalLostStake)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-box">
        <div className="section-head">
          <div>
            <h2>Wallet transactions</h2>
            <p className="page-subtitle">Deposits, withdrawals, bet stake & wins</p>
          </div>
        </div>

        {walletTransactions.length === 0 ? (
          <p className="page-subtitle">No transactions.</p>
        ) : (
          <div className="entity-list entity-list--compact">
            {walletTransactions.map((tx, idx) => (
              <div className="entity-card entity-card--static" key={tx.id ?? idx}>
                <div className="entity-card-head">
                  <div>
                    <div className="entity-card-title">{tx.type ?? tx.transaction_type}</div>
                    <div className="list-muted">{formatDate(tx.created_at ?? tx.createdAt)}</div>
                  </div>
                  <span className="pill">{formatMoney(tx.amount)}</span>
                </div>
                {tx.description && <p className="list-muted">{tx.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section-box">
        <div className="section-head">
          <div>
            <h2>Bet history</h2>
            <p className="page-subtitle">{bets.length} bet(s)</p>
          </div>
        </div>

        {bets.length === 0 ? (
          <p className="page-subtitle">No bets yet.</p>
        ) : (
          <div className="entity-list entity-list--compact">
            {bets.map((bet, idx) => {
              const g = bet.game ?? bet.games ?? {};
              return (
                <div className="entity-card entity-card--static" key={bet.id ?? idx}>
                  <div className="entity-card-head">
                    <div>
                      <div className="entity-card-title">
                        {g.game_name ?? bet.game_name ?? "Round"}
                      </div>
                      <div className="list-muted">
                        #{bet.selected_number ?? bet.number ?? "—"}
                        {g.published_number != null && ` · result #${g.published_number}`}
                      </div>
                    </div>
                    <StatusBadge status={bet.status} />
                  </div>
                  <div className="entity-stats">
                    <div className="entity-stat">
                      <span className="entity-stat-label">Stake</span>
                      <span className="entity-stat-value">
                        {formatMoney(bet.amount ?? bet.stake)}
                      </span>
                    </div>
                    <div className="entity-stat">
                      <span className="entity-stat-label">Payout</span>
                      <span className="entity-stat-value">
                        {formatMoney(bet.payout ?? bet.win_amount ?? 0)}
                      </span>
                    </div>
                    <div className="entity-stat">
                      <span className="entity-stat-label">When</span>
                      <span className="entity-stat-value entity-stat-value--sm">
                        {formatDate(bet.created_at ?? bet.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
