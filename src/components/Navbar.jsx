import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaWallet,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="logo">AdminPro</div>

      <div className="nav-links">
        <Link to="/" className="nav-item">
          <FaHome /> Dashboard
        </Link>

        <Link to="/users" className="nav-item">
          <FaUsers /> Users
        </Link>

        <Link to="/wallet" className="nav-item">
          <FaWallet /> Wallet
        </Link>
      </div>

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default Navbar;