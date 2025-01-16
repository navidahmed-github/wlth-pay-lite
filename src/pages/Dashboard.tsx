import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentForm from '../components/PaymentForm';
import TransactionTable from '../components/TransactionTable';

interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  method: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API URL (Ensure it's valid or fallback to a placeholder)
  const API_URL = process.env.REACT_APP_API_BASE_URL || 'https://ziagg50mj8.execute-api.us-east-1.amazonaws.com/default/transactionsHandler';

  // Fetch transactions on component load
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(API_URL);
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setTransactions(response.data); // Assign valid data
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [API_URL]);

  // Add a new transaction
  const addTransaction = async (newTransaction: { recipient: string; amount: number; method: string }) => {
    const date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    try {
      const response = await axios.post(API_URL, { ...newTransaction, date });
      setTransactions((prev) => [...prev, response.data]); // Append new transaction
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. Please try again later.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Loading and Error States */}
      {loading && <p>Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Payment Form for adding transactions */}
      <PaymentForm onAddTransaction={addTransaction} />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

        {/* Transaction Table for displaying transactions */}
        <TransactionTable transactions={transactions} loading={loading} error={error} />
        </div>
    </div>
  );
};

export default Dashboard;