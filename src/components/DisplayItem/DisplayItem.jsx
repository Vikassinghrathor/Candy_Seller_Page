
// DisplayItem.js
import React, { useContext } from 'react';
import CartContext from '../../store/Cart-Context';

const DisplayItem = ({ product, onPurchase }) => {
  const { addItem } = useContext(CartContext);

  const purchaseHandler = (size, packSizeMultiplier) => {
    addItem({
      ...product,
      selectedSize: size,
      price: Number(product.price) * packSizeMultiplier,
    });

    onPurchase(product.id, size, packSizeMultiplier);
  };

  return (
    <div>
      <h2>Candy Name: {product.candyName}</h2>
      <p>Description: {product.description}</p>
      <p>Price: ${Number(product.price).toFixed(2)}</p>

      {/* Buttons to dynamically select pack sizes */}
      <button onClick={() => purchaseHandler('small', 20)}>Buy Pack of 20</button>
      <button onClick={() => purchaseHandler('medium', 50)}>Buy Pack of 50</button>
      <button onClick={() => purchaseHandler('large', 100)}>Buy Pack of 100</button>

      {/* Button to make the purchase */}
      <button onClick={() => purchaseHandler('now', 1)}>Buy Now</button>
    </div>
  );
};

export default DisplayItem;

// The rest of the components and context remain unchanged.
