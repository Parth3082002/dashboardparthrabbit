import { useEffect, useState } from "react";
import { getAllUsers } from "../services/user.api";

function Users() {
  const [users, setUsers] = useState([]);

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
    <div>
      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <p>
              <strong>User ID:</strong>{" "}
              {user.user_id}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {user.phone_number}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {user.status}
            </p>

            <p>
              <strong>Balance:</strong>{" "}
              {user.wallets?.balance}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Users;