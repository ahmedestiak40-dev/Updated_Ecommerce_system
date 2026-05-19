import React from 'react';

const SocialShare = ({ product }) => {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(product.name + ' - ' + window.location.href)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(product.name)}`,
    email: `mailto:?subject=${encodeURIComponent('Check out this product')}&body=${encodeURIComponent(product.name + '\n' + window.location.href)}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="social-share">
      <span>Share this product:</span>
      <div className="share-buttons">
        <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="share-btn facebook">📘</a>
        <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="share-btn twitter">🐦</a>
        <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="share-btn whatsapp">💬</a>
        <a href={shareUrls.pinterest} target="_blank" rel="noopener noreferrer" className="share-btn pinterest">📌</a>
        <a href={shareUrls.email} className="share-btn email">✉️</a>
        <button onClick={copyToClipboard} className="share-btn copy">🔗</button>
      </div>
    </div>
  );
};

export default SocialShare;