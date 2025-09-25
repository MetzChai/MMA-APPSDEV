// ProductCard.jsx
import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <img src={product.thumbnail} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-brand">{product.brand}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-rating">⭐ {product.rating}</p>
      </div>
    </div>
  );
}

export default ProductCard;
