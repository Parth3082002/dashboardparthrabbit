// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://parthdemorabitmq.onrender.com/api",
// });

// export default API;
import axios from "axios";

const API = axios.create({
   baseURL: "http://localhost:5000/api",
  // baseURL: "https://parthdemorabitmq.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;