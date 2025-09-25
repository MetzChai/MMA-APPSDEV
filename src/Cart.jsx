// Cart.jsx
import React from 'react';
import './Cart.css';

function Cart({ cart, onCheckout, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div className="cart">
      <h3>🛒 Cart</h3>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map(item => (
            <li key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} className="cart-thumb" />
              <div className="cart-info">
                <span className="cart-title">{item.title}</span>
                <span className="cart-qty">x{item.qty}</span>
                <span className="cart-price">${item.price * item.qty}</span>
                <button className="cart-remove" onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="checkout-btn" disabled={cart.length === 0} onClick={onCheckout}>
        Checkout
      </button>
    </div>
  );
}

export default Cart;
