// DisplayItem.js
import React, { useContext } from 'react';
import CartContext from '../../store/Cart-Context';

const DisplayItem = ({ product, onPurchase }) => {
  const { addItem } = useContext(CartContext);

  const purchaseHandler = (size) => {
    let packSizeMultiplier;

    switch (size) {
      case 'small':
        packSizeMultiplier = 20;
        break;
      case 'medium':
        packSizeMultiplier = 50;
        break;
      case 'large':
        packSizeMultiplier = 100;
        break;
      default:
        packSizeMultiplier = 1;
    }

    addItem({
      ...product,
      selectedSize: size,
      price: Number(product.price),
    });

    onPurchase(product.id, size, packSizeMultiplier);
  };

  return (
    <div>
      <h2>Candy Name: {product.candyName}</h2>
      <p>Description: {product.description}</p>
      <p>Price: ${Number(product.price).toFixed(2)}</p>

      {/* Buttons to dynamically select pack sizes */}
      <button onClick={() => purchaseHandler('small')}>Buy Pack of 20</button>
      <button onClick={() => purchaseHandler('medium')}>Buy Pack of 50</button>
      <button onClick={() => purchaseHandler('large')}>Buy Pack of 100</button>

      {/* Button to make the purchase */}
      <button onClick={() => purchaseHandler('now')}>Buy Now</button>
    </div>
  );
};

export default DisplayItem;
