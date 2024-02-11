import React, { useState, useEffect } from 'react';

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    // Fetch statistics for the selected month
    const apiUrl = `/statistics?month=${selectedMonth}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setStatistics(data))
      .catch(error => console.error('Error fetching statistics:', error));
  }, [selectedMonth]);

  return (
    <div>
      {/* Display statistics */}
      {/* ... */}
    </div>
  );
};

export default Statistics;
