import { useState } from "react";
import { adminLogin } from "../services/auth.api";
import { useNavigate } from "react-router-dom";

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
       console.log(
    "Backend Error:",
    error.response?.data
  );

  alert(
    error.response?.data?.message ||
    "Login failed"
  );
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;