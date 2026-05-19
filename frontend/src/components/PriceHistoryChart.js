import React, { useState, useEffect } from 'react';

const PriceHistoryChart = ({ productId, currentPrice }) => {
  const [showChart, setShowChart] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    if (showChart) {
      // Generate mock price history data
      const generateHistory = () => {
        const history = [];
        const today = new Date();
        for (let i = 30; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const randomFactor = 0.85 + Math.random() * 0.3;
          const price = currentPrice * randomFactor;
          history.push({
            date: date.toLocaleDateString(),
            price: price.toFixed(2),
          });
        }
        setPriceHistory(history);
      };
      generateHistory();
    }
  }, [showChart, currentPrice]);

  const getMinPrice = () => {
    if (priceHistory.length === 0) return 0;
    return Math.min(...priceHistory.map(p => parseFloat(p.price)));
  };

  const getMaxPrice = () => {
    if (priceHistory.length === 0) return 0;
    return Math.max(...priceHistory.map(p => parseFloat(p.price)));
  };

  return (
    <div className="price-history">
      <button className="price-history-btn" onClick={() => setShowChart(!showChart)}>
        📊 Price History
      </button>
      
      {showChart && (
        <div className="price-chart-modal">
          <div className="chart-header">
            <h4>Price History (Last 30 Days)</h4>
            <button onClick={() => setShowChart(false)}>✕</button>
          </div>
          <div className="chart-stats">
            <div>Current: ${currentPrice}</div>
            <div>Lowest: ${getMinPrice()}</div>
            <div>Highest: ${getMaxPrice()}</div>
          </div>
          <div className="chart-bars">
            {priceHistory.map((point, index) => (
              <div key={index} className="chart-bar-container">
                <div 
                  className="chart-bar"
                  style={{
                    height: `${(point.price / getMaxPrice()) * 100}%`,
                    backgroundColor: point.price >= currentPrice ? '#4caf50' : '#ff9800'
                  }}
                  title={`${point.date}: $${point.price}`}
                ></div>
                <span className="chart-label">
                  {point.date.split('/')[0]}/{point.date.split('/')[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceHistoryChart;