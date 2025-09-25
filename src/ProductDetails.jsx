// ProductDetails.jsx
import React from 'react';
import './ProductDetails.css';

function ProductDetails({ product, onClose, onAddToCart }) {
  if (!product) return null;
  return (
    <div className="product-details-overlay">
      <div className="product-details-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="details-content">
          <img src={product.thumbnail} alt={product.title} className="details-image" />
          <div className="details-info">
            <h2>{product.title}</h2>
            <p className="details-brand">Brand: {product.brand}</p>
            <p className="details-category">Category: {product.category}</p>
            <p className="details-desc">{product.description}</p>
            <p className="details-price">${product.price} <span className="details-discount">({product.discountPercentage}% off)</span></p>
            <p className="details-rating">⭐ {product.rating} | Stock: {product.stock}</p>
            <button className="add-cart-btn" onClick={() => onAddToCart(product)}>Add to Cart</button>
          </div>
        </div>
        <div className="details-gallery">
          {product.images.map((img, idx) => (
            <img key={idx} src={img} alt="gallery" className="gallery-img" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
