import React, { useState, useEffect } from 'react';
import TransactionsBarChart from './TransactionsBarChart';

const TransactionsTable = () => {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('Mar');
  const [searchText, setSearchText] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // New state for transaction statistics
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    // Populate months
    const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setMonths(monthsArray);

    // Load transactions for the default month (March)
    loadTransactions('Mar');

    // Load statistics for the default month (March)
    loadStatistics('Mar');
  }, []);

  useEffect(() => {
    // Load transactions whenever selected month or search text changes
    loadTransactions(selectedMonth, searchText);

    // Load statistics whenever selected month changes
    loadStatistics(selectedMonth);
  }, [selectedMonth, searchText]);

  const loadTransactions = async (month, search = '') => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/list-transactions?month=${month}&search=${search}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }
      const transactionsData = await response.json();
      setTransactions(transactionsData);
      setCurrentPage(1); // Reset to the first page when changing the month or search text
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  const loadStatistics = async (month) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/statistics?month=${month}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch statistics: ${response.statusText}`);
      }
      const statisticsData = await response.json();
      setStatistics(statisticsData);
    } catch (error) {
      console.error('Error fetching statistics:', error.message);
    }
  };

  const handleNextPage = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/pagination-endpoint?page=${currentPage + 1}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch next page data: ${response.statusText}`);
      }
      const nextPageData = await response.json();
      // Handle updating state or performing other actions with nextPageData
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching next page data:', error.message);
    }
  };

  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/pagination-endpoint?page=${currentPage - 1}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch previous page data: ${response.statusText}`);
        }
        const previousPageData = await response.json();
        // Handle updating state or performing other actions with previousPageData
        setCurrentPage((prevPage) => prevPage - 1);
      } catch (error) {
        console.error('Error fetching previous page data:', error.message);
      }
    }
  };

  return (
    <div>
      <h1>Transactions Table and Charts</h1>

      <input
        type="text"
        placeholder="Search transactions"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <label htmlFor="monthDropdown">Select Month:</label>
      <select
        id="monthDropdown"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <table style={{ borderCollapse: 'collapse', marginTop: '20px', border: '1px solid red' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid red', padding: '12px', backgroundColor: '#f2f2f2' }}>ID</th>
            <th style={{ border: '1px solid red', padding: '12px', backgroundColor: '#f2f2f2' }}>Title</th>
            <th style={{ border: '1px solid red', padding: '12px', backgroundColor: '#f2f2f2' }}>Description</th>
            <th style={{ border: '1px solid red', padding: '12px', backgroundColor: '#f2f2f2' }}>Price</th>
            <th style={{ border: '1px solid red', padding: '12px', backgroundColor: '#f2f2f2' }}>Date of Sale</th>
            <th style={{ border: '1px solid red', padding: '12px', backgroundColor: '#f2f2f2' }}>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td style={{ border: '1px solid red', padding: '12px' }}>{transaction.id}</td>
              <td style={{ border: '1px solid red', padding: '12px' }}>{transaction.title}</td>
              <td style={{ border: '1px solid red', padding: '12px' }}>{transaction.description}</td>
              <td style={{ border: '1px solid red', padding: '12px' }}>{transaction.price}</td>
              <td style={{ border: '1px solid red', padding: '12px' }}>{transaction.dateOfSale}</td>
              <td style={{ border: '1px solid red', padding: '12px' }}>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
      <div>
        <h2>Transactions Statistics</h2>
        <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
      <div>
        <TransactionsBarChart selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

export default TransactionsTable;
