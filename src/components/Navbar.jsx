import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Link to="/">Dashboard</Link>
      <Link to="/users">Users</Link>
      <Link to="/create-user">Create User</Link>
      <Link to="/wallet">Wallet</Link>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;