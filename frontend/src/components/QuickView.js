import React from 'react';

const QuickView = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal quick-view-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>✕</button>
        <div className="quick-view-content">
          <div className="quick-view-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="quick-view-info">
            <h2>{product.name}</h2>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description}</p>
            <div className="stock-status">
              {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : '❌ Out of Stock'}
            </div>
            <button 
              className="btn"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
            <button className="btn-secondary" onClick={onClose}>
              View Full Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;