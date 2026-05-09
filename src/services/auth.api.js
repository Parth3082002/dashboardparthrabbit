import API from "./api";

export const adminLogin = async (data) => {
  const response = await API.post("/auth/admin/login", data);
  return response.data;
};