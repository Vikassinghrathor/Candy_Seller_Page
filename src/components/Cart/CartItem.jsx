// CartItem.js
import React from 'react';

const CartItem = (props) => {
  const { id, candyName, quantity, price, selectedSize, onRemove, onAdd } = props;

  return (
    <li>
      <div>
        <h3>{candyName}</h3>
        <div>
          <span>Quantity: {quantity}</span>
          <span>Size: {selectedSize}</span>
          <span>Total Price: ${Number(price * quantity).toFixed(2)}</span>
        </div>
      </div>
      <div>
        <button onClick={() => onRemove(id)}>Remove</button>
        <button onClick={() => onAdd({ id, candyName, price, selectedSize })}>Add</button>
      </div>
    </li>
  );
};

export default CartItem;
