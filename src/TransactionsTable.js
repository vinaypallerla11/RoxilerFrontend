import React, { useState, useEffect } from 'react';

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Fetch transactions based on selected month and search input
    const apiUrl = `/list-transactions?month=${selectedMonth}&search=${searchInput}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, [selectedMonth, searchInput]);

  return (
    <div>
      {/* Search Transaction Box */}
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search Transaction"
      />
      <button onClick={() => setSearchInput('')}>Clear Search</button>

      {/* Display transactions table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.dateOfSale}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons (for Next and Previous) */}
      <button onClick={() => console.log('Load Previous Page')}>Previous</button>
      <button onClick={() => console.log('Load Next Page')}>Next</button>
    </div>
  );
};

export default TransactionsTable;
