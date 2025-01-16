import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentForm from '../components/PaymentForm';
import TransactionTable from '../components/TransactionTable';

interface Transaction {
  id: number;
  recipient: string;
  amount: number;
  method: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Fetch transactions on load
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://<API_URL>/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = async (newTransaction: { recipient: string; amount: number; method: string }) => {
    const date = new Date().toISOString().split('T')[0];
    const id = transactions.length + 1;

    try {
      const response = await axios.post('https://<API_URL>/transactions', {
        ...newTransaction,
        id,
        date,
      });

      setTransactions((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <PaymentForm onAddTransaction={addTransaction} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;