import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const cost = parseFloat(item.cost.replace('$', ''));
            return total + (cost * item.quantity);
        }, 0).toFixed(2);
    };

    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
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
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    return (
        <div className="cart-container">
            <h2>Total Number of Plants: {calculateTotalQuantity()}</h2>
            <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button className="continue-shopping" onClick={onContinueShopping}>
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div className="cart-item" key={item.name}>
                            <img className="cart-item-image" src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <h3 className="cart-item-name">{item.name}</h3>
                                <p className="cart-item-cost">{item.cost}</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => handleDecrement(item)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrement(item)}>+</button>
                                </div>
                                <p>Total: ${(parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2)}</p>
                                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-actions">
                        <button className="continue-shopping" onClick={onContinueShopping}>
                            Continue Shopping
                        </button>
                        <button className="checkout" onClick={() => alert('Checkout functionality coming soon!')}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartItem;


