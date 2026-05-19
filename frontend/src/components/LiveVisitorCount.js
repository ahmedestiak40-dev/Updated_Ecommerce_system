import React, { useState, useEffect } from 'react';

const LiveVisitorCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate live visitors
    const interval = setInterval(() => {
      const newCount = Math.floor(Math.random() * 50) + 10;
      setCount(newCount);
    }, 30000);
    
    setCount(Math.floor(Math.random() * 50) + 10);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-visitors">
      <span className="live-dot"></span>
      <span>{count} people are viewing this site</span>
    </div>
  );
};

export default LiveVisitorCount;