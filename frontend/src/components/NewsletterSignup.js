import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/marketing/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      
      if (response.ok) {
        setSubscribed(true);
        setEmail('');
        setName('');
        setTimeout(() => setSubscribed(false), 3000);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
        <h3>📧 Subscribe to Our Newsletter</h3>
        <p>Get exclusive offers, new arrivals, and special discounts directly to your inbox!</p>
        {subscribed ? (
          <div className="success-message">✅ Thank you for subscribing!</div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        )}
        <p className="newsletter-note">No spam, unsubscribe anytime.</p>
      </div>
    </div>
  );
};

export default NewsletterSignup;