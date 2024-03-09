// Input.js

import React, { useState } from 'react';

const Input = ({ onAddProduct }) => {
  const [input, setInput] = useState({
    candyName: '',
    description: '',
    price: '',
  });

  const handleInputChange = (field, value) => {
    setInput((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!input.candyName || !input.description || !input.price) {
      alert('Please fill in all fields.');
      return;
    }

    onAddProduct(input);

    setInput({
      candyName: '',
      description: '',
      price: '',
    });
  };

  return (
    <>
      <div>
        <form onSubmit={handleAddProduct}>
          <label>Candy Name</label>
          <input
            type='text'
            value={input.candyName}
            onChange={(e) => handleInputChange('candyName', e.target.value)}
          />
          <label>Description</label>
          <input
            type='text'
            value={input.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          <label>Price</label>
          <input
            type='number'
            value={input.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </>
  );
};

export default Input;
