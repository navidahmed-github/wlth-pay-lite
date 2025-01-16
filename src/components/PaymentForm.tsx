import React, { useState } from 'react';

interface PaymentFormProps {
  onAddTransaction: (transaction: { recipient: string; amount: number; method: string }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onAddTransaction }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Credit Card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction({ recipient, amount: parseFloat(amount), method });
    setRecipient('');
    setAmount('');
    setMethod('Credit Card');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">New Payment</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Recipient</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Recipient Name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Payment Amount"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Payment Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Payment
      </button>
    </form>
  );
};

export default PaymentForm;