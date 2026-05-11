import { useState } from "react";
import { adminLogin } from "../services/auth.api";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await adminLogin(form);

      localStorage.setItem(
        "admin_token",
        response.token
      );

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Secure Admin Dashboard Login
        </p>

        <div className="input-group">
          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />
        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;