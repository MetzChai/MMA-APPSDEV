// ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products, onProductClick }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onClick={onProductClick} />
      ))}
    </div>
  );
}

export default ProductList;
