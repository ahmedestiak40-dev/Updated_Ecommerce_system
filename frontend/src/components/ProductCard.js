import React, { useState } from 'react';
import QuickView from './QuickView';
import PriceAlertButton from './PriceAlertButton';
import SocialShare from './SocialShare';
import PriceHistoryChart from './PriceHistoryChart';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted, onViewDetails, onCompare }) => {
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <div className="product-card">
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product._id);
          }}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
        <button 
          className="compare-btn-card"
          onClick={(e) => {
            e.stopPropagation();
            onCompare(product);
          }}
        >
          📊 Compare
        </button>
        <button 
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowQuickView(true);
          }}
        >
          👁️ Quick View
        </button>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          onClick={onViewDetails}
          style={{ cursor: 'pointer' }}
        />
        <div className="product-info">
          <h3 className="product-name" onClick={onViewDetails} style={{ cursor: 'pointer' }}>
            {product.name}
          </h3>
          <p className="product-description">{product.description.substring(0, 80)}...</p>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <PriceHistoryChart productId={product._id} currentPrice={product.price} />
          <PriceAlertButton productId={product._id} currentPrice={product.price} />
          <button 
            className="btn" 
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <SocialShare product={product} />
        </div>
      </div>

      {showQuickView && (
        <QuickView 
          product={product}
          onClose={() => setShowQuickView(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
};

export default ProductCard;