import axios from "axios";

const API = axios.create({
  baseURL: "https://parthdemorabitmq.onrender.com/api",
});

export default API;