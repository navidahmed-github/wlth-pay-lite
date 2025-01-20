import React, { useState, useEffect } from "react";
import PaymentForm from "../components/PaymentForm";
import { auth } from "../firebase"; // Ensure this path matches your firebase setup
import { useNavigate } from "react-router-dom";

interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  method: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add a loading state
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_BASE_URL || "";
  const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN || "";

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login"); // Redirect to login after logout
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Error fetching transactions");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTransactions();
  }, [API_URL, BEARER_TOKEN]);

  const onAddTransaction = async (transaction: Partial<Transaction>) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      const newTransaction = await response.json();
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError("Error adding transaction");
    }
  };

  return (
    <div className="dashboard bg-gray-100 min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="dashboard-content grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="dashboard-section bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-primary mb-4">Add a Transaction</h2>
          <PaymentForm onAddTransaction={onAddTransaction} />
        </div>
        <div className="dashboard-section bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-primary mb-4">Transaction History</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="spinner border-t-4 border-b-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">Recipient</th>
                  <th className="border border-gray-300 p-2 text-left">Amount</th>
                  <th className="border border-gray-300 p-2 text-left">Method</th>
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 p-2">{transaction.recipient}</td>
                    <td className="border border-gray-300 p-2">{transaction.amount}</td>
                    <td className="border border-gray-300 p-2">{transaction.method}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(transaction.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;