// App.js
import React, { useState, useEffect } from 'react';
import Input from './components/InputForm/InputForm';
import DisplayItem from './components/DisplayItem/DisplayItem';
import Cart from './components/Cart/Cart';
import CartProvider from './store/Cart-Provider';
import axios from 'axios';

const API_URL = 'https://crudcrud.com/api/44d54239209f491b8af53328d7001cdd/candies';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get(API_URL)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAddProduct = (product) => {
    // Add product to the local state
    setProducts((prevProducts) => [...prevProducts, { ...product, id: Date.now() }]);
    
    // Send data to the API
    axios.post(API_URL, product)
      .then(response => {
        console.log('Data added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding data:', error);
      });
  };

 const handlePurchase = (productId, size, packSizeMultiplier) => {
    const purchasedProduct = products.find((product) => product.id === productId);

    if (purchasedProduct) {
      let packSize;
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
    }
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
