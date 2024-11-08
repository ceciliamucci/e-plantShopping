import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + calculateTotalCost(item);
    }, 0).toFixed(2); // Added toFixed(2) for proper decimal formatting
  };

  // Calculate total quantity of all items
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      handleRemove(item);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', ''));
    return cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart ({calculateTotalQuantity()} items)</h2>
        <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      </div>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="get-started-button" onClick={handleContinueShopping}>Start Shopping</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Unit Price: {item.cost}</div>
                  <div className="cart-item-quantity">
                    <button 
                      className="cart-item-button cart-item-button-dec" 
                      onClick={() => handleDecrement(item)}
                      aria-label="Decrease quantity"
                    >-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button 
                      className="cart-item-button cart-item-button-inc" 
                      onClick={() => handleIncrement(item)}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                  <div className="cart-item-total">Subtotal: ${calculateTotalCost(item).toFixed(2)}</div>
                  <button 
                    className="cart-item-delete" 
                    onClick={() => handleRemove(item)}
                    aria-label="Remove item"
                  >Remove</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="total-items">Total Items: {calculateTotalQuantity()}</div>
            <div className="total-amount">Total Amount: ${calculateTotalAmount()}</div>
          </div>
          
          <div className="cart-actions">
            <button 
              className="get-started-button" 
              onClick={handleContinueShopping}
            >Continue Shopping</button>
            <button 
              className="get-started-button1" 
              onClick={handleCheckoutShopping}
            >Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;



