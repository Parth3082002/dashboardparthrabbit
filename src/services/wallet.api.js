import API from "./api";

export const depositWallet = async (data) => {
  const response = await API.post("/wallet/deposit", data);
  return response.data;
};

export const withdrawWallet = async (data) => {
  const response = await API.post("/wallet/withdraw", data);
  return response.data;
};

export const getWalletHistory = async () => {
  const response = await API.get("/wallet/history");
  return response.data;
};