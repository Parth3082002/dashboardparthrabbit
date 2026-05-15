import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { getAllUsers } from "../services/user.api";
import { formatMoney } from "../utils/format";
import PageLoader from "../components/PageLoader";
import StatusBadge from "../components/StatusBadge";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.users || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openUser = (user) => {
    const id = user.user_id ?? user.userId ?? user.id;
    if (id) navigate(`/users/${id}`);
  };

  return (
    <div className="page">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1 className="title-row">
            Users
            <button
              className="icon-btn"
              type="button"
              onClick={() => navigate("/create-user")}
              aria-label="Create user"
              title="Create user"
            >
              <FaPlus />
            </button>
          </h1>
          <p>Browse accounts — tap a user for full report.</p>
        </div>
      </div>

      <div className="section-box">
        {loading ? (
          <PageLoader label="Loading users…" />
        ) : users.length === 0 ? (
          <p className="page-subtitle">No users found.</p>
        ) : (
          <>
            <div className="mobile-only entity-list">
              {users.map((user, idx) => (
                <button
                  type="button"
                  key={user.id ?? user._id ?? idx}
                  className="entity-card"
                  onClick={() => openUser(user)}
                >
                  <div className="entity-card-head">
                    <div>
                      <div className="entity-card-title">
                        {user.user_id ?? user.userId ?? "—"}
                      </div>
                      <div className="list-muted">
                        {user.phone_number ?? user.phoneNumber ?? "—"}
                      </div>
                    </div>
                    <StatusBadge status={user.status} />
                  </div>
                  <div className="entity-footer">
                    Balance <strong>{formatMoney(user.wallets?.balance ?? user.balance)}</strong>
                  </div>
                </button>
              ))}
            </div>

            <div className="desktop-only table-wrap">
              <table className="table table--clickable">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr
                      key={user.id ?? user._id ?? idx}
                      onClick={() => openUser(user)}
                      onKeyDown={(e) => e.key === "Enter" && openUser(user)}
                      tabIndex={0}
                      role="button"
                    >
                      <td>{user.user_id ?? user.userId ?? "—"}</td>
                      <td>{user.phone_number ?? user.phoneNumber ?? "—"}</td>
                      <td>
                        <StatusBadge status={user.status} />
                      </td>
                      <td>{formatMoney(user.wallets?.balance ?? user.balance)}</td>
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

export default UserDetails;
