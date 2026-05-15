import API from "./api";

export const getDashboard = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};

export const getGames = async (params = {}) => {
  const response = await API.get("/admin/games", { params });
  return response.data;
};

export const getGameById = async (gameId) => {
  const response = await API.get(`/admin/games/${gameId}`);
  return response.data;
};
