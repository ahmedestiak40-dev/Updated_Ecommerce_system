import React, { useState, useEffect } from 'react';

const RecentlySoldNotification = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const products = [
      { name: 'Wireless Headphones', time: 'just now', location: 'New York' },
      { name: 'Smart Watch', time: '2 minutes ago', location: 'London' },
      { name: 'Leather Backpack', time: '5 minutes ago', location: 'Toronto' },
      { name: 'Desk Lamp', time: '8 minutes ago', location: 'Sydney' },
    ];

    const showRandomNotification = () => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      setNotification(randomProduct);
      setTimeout(() => setNotification(null), 5000);
    };

    showRandomNotification();
    const interval = setInterval(showRandomNotification, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!notification) return null;

  return (
    <div className="sold-notification">
      <div className="notification-content">
        <span className="fire-icon">🔥</span>
        <span>
          Someone from {notification.location} just bought {notification.name} {notification.time}
        </span>
      </div>
    </div>
  );
};

export default RecentlySoldNotification;