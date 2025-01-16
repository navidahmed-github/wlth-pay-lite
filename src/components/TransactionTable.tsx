import React from "react";

interface Transaction {
    id: number;
    recipient: string;
    amount: number;
    method: string;
    date: string;
  }
  
  interface TransactionTableProps {
    transactions: Transaction[];
  }
  
  const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Recipient</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Method</th>
              <th className="py-2 px-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2 px-4 border">{transaction.recipient}</td>
                <td className="py-2 px-4 border">${transaction.amount}</td>
                <td className="py-2 px-4 border">{transaction.method}</td>
                <td className="py-2 px-4 border">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TransactionTable;