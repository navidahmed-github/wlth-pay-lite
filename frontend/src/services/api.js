import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Replace with your API Gateway URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchTransactions = async () => {
  try {
    const response = await api.get("/transactionsHandler");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const addTransaction = async (transaction) => {
  try {
    const response = await api.post("/transactions", transaction);
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

export default api;
