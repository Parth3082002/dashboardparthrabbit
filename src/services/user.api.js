import API from "./api";

export const createUser = async (data) => {
  const response = await API.post("/admin/create-user", data);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await API.get("/admin/users");
  return response.data;
};

export const getUserDetails = async (id) => {
  const response = await API.get(`/admin/user/${id}`);
  return response.data;
};