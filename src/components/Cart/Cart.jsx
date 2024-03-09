// Cart.js
import React, { useContext } from 'react';
import CartItem from './CartItem';
import CartContext from '../../store/Cart-Context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.cartItems && cartCtx.cartItems.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  const cartItems = (
    <ul>
      {cartCtx.cartItems &&
        cartCtx.cartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            candyName={item.candyName}
            quantity={item.quantity}
            price={item.price}
            selectedSize={item.selectedSize}
            onRemove={() => cartItemRemoveHandler(item.id)}
            onAdd={() => cartItemAddHandler(item)}
          />
        ))}
    </ul>
  );

  // Calculate the total quantity of items
  const totalAmount = cartCtx.cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      {cartItems}
      <div>
        <span>Total Amount: {totalAmount}</span>
      </div>
      <div>
        <button onClick={props.onClose}>Close</button>
        {hasItems && <button>Order</button>}
      </div>
    </div>
  );
};

export default Cart;