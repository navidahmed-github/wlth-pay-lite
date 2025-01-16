import React, { useState } from 'react';

interface PaymentFormProps {
  onAddTransaction: (transaction: {
    id: string;
    recipient: string;
    amount: number;
    method: string;
    date: string;
  }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onAddTransaction }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Credit Card');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!recipient.trim()) {
      setError('Recipient name is required.');
      return false;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Amount must be a positive number.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onAddTransaction({
      id: crypto.randomUUID(), // Generate a unique ID
      recipient,
      amount: parseFloat(amount),
      method,
      date: new Date().toISOString(), // Add current date
    });

    // Clear form fields
    setRecipient('');
    setAmount('');
    setMethod('Credit Card');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-primary mb-4">Add Payment</h2>

      {/* Error Message */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Recipient Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Recipient</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter recipient name"
          required
        />
      </div>

      {/* Amount Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter payment amount"
          required
        />
      </div>

      {/* Payment Method Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Payment Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold p-2 rounded hover:bg-blue-700 transition"
      >
        Add Payment
      </button>
    </form>
  );
};

export default PaymentForm;