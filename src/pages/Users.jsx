import { useEffect, useState } from "react";
import { getAllUsers } from "../services/user.api";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getAllUsers();
    setUsers(response.users || []);
  };

  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <div
          key={user._id}
          onClick={() =>
            navigate(`/user/${user._id}`)
          }
        >
          {user.userId}
        </div>
      ))}
    </div>
  );
}

export default Users;