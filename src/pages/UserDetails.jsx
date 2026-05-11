import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { getAllUsers } from "../services/user.api";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();

      setUsers(response.users || []);
    } catch (error) {
      console.log(error);
    }
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
          <p>Browse and monitor user accounts.</p>
        </div>
      </div>

      <div className="section-box">
        {users.length === 0 ? (
          <p className="page-subtitle">No users found.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
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
                  <tr key={user.id ?? user._id ?? idx}>
                    <td>{user.user_id ?? user.userId ?? "-"}</td>
                    <td>{user.phone_number ?? user.phoneNumber ?? "-"}</td>
                    <td>
                      <span className={`pill ${user.status === "active" ? "pill-ok" : ""}`}>
                        {user.status ?? "unknown"}
                      </span>
                    </td>
                    <td>{user.wallets?.balance ?? user.balance ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;