import React from "react";

interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  method: string;
  date: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  error: string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, loading, error }) => {
  if (loading) {
    return <p className="text-center text-primary font-semibold">Loading transactions...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 font-semibold">{error}</p>;
  }

  if (!transactions.length) {
    return <p className="text-center text-gray-600 font-semibold">No transactions available.</p>;
  }

  return (
    <table className="table-auto w-full bg-white shadow rounded-lg">
      <thead className="bg-primary text-white">
        <tr>
          <th className="p-3 text-left">ID</th>
          <th className="p-3 text-left">Recipient</th>
          <th className="p-3 text-left">Amount</th>
          <th className="p-3 text-left">Method</th>
          <th className="p-3 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr
            key={transaction.id}
            className={`${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-gray-100`}
          >
            <td className="p-3">{transaction.id}</td>
            <td className="p-3">{transaction.recipient}</td>
            <td className="p-3">${transaction.amount.toFixed(2)}</td>
            <td className="p-3">{transaction.method}</td>
            <td className="p-3">{transaction.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;