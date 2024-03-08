// App.js
import React, { useState } from 'react';
import Input from './components/InputForm/InputForm';
import DisplayItem from './components/DisplayItem/DisplayItem';
import Cart from './components/Cart/Cart';
import CartProvider from './store/Cart-Provider';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleAddProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, { ...product, id: Date.now() }]);
  };

  const handlePurchase = (productId, size, packSizeMultiplier) => {
    let packSize;
    const purchasedProduct = products.find((product) => product.id === productId);

    if (purchasedProduct) {
      if (size === 'now') {
        packSize = 1;
      } else {
        packSize = parseInt(size, 10);
      }

      const totalForPurchase = packSize * packSizeMultiplier * Number(purchasedProduct.price);

      setTotalAmount((prevTotalAmount) => prevTotalAmount + totalForPurchase);

      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...purchasedProduct, selectedSize: size, price: totalForPurchase },
      ]);
    }

    // Update local product quantities
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          const updatedQuantity = Math.max(0, product.quantity - packSize);

          return updatedQuantity === 0
            ? null
            : {
                ...product,
                quantity: updatedQuantity,
              };
        }
        return product;
      }).filter(Boolean);
    });
  };

  return (
    <CartProvider cartItems={cartItems} setCartItems={setCartItems}>
      <Input onAddProduct={handleAddProduct} />
      {products.map((product) => (
        <DisplayItem key={product.id} product={product} onPurchase={handlePurchase} />
      ))}
      <Cart totalAmount={totalAmount} />
    </CartProvider>
  );
}

export default App;
