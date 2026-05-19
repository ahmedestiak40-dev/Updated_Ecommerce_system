import React, { useState } from 'react';

const PriceAlertButton = ({ productId, currentPrice }) => {
  const [showModal, setShowModal] = useState(false);
  const [desiredPrice, setDesiredPrice] = useState('');
  const [alertSet, setAlertSet] = useState(false);

  const handleSetAlert = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to set price alerts');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/marketing/price-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, desiredPrice: parseFloat(desiredPrice) }),
      });

      if (response.ok) {
        setAlertSet(true);
        setTimeout(() => {
          setShowModal(false);
          setAlertSet(false);
        }, 2000);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Error setting alert:', error);
    }
  };

  return (
    <>
      <button className="price-alert-btn" onClick={() => setShowModal(true)}>
        🔔 Set Price Alert
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal price-alert-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Price Alert</h3>
            <p>Current price: <strong>${currentPrice}</strong></p>
            <p>Get notified when price drops to your desired amount</p>
            <input
              type="number"
              placeholder="Desired price ($)"
              value={desiredPrice}
              onChange={(e) => setDesiredPrice(e.target.value)}
              step="0.01"
            />
            <div className="modal-buttons">
              <button onClick={handleSetAlert} className="btn">Set Alert</button>
              <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            </div>
            {alertSet && <div className="success-message">✅ Alert set successfully!</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default PriceAlertButton;