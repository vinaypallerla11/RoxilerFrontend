import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const TransactionsBarChart = ({ selectedMonth }) => {
  const [priceRangesData, setPriceRangesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`/price-range-chart?month=${selectedMonth}`);
        const response = await fetch(`http://localhost:3000/price-range-chart?month=${selectedMonth}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch price range data: ${response.statusText}`);
        }
        const data = await response.json();
        setPriceRangesData(data);
      } catch (error) {
        console.error('Error fetching price range data:', error.message);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const chartData = {
    labels: priceRangesData.map((range) => range.priceRange),
    datasets: [
      {
        label: 'Number of Items',
        data: priceRangesData.map((range) => range.itemCount),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      {/* Check if data exists before rendering the chart */}
      {priceRangesData.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default TransactionsBarChart;
