// CartProvider.js
import React, { useReducer } from 'react';
import CartContext from './Cart-Context';

const defaultCartState = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_TO_CART') {
    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingCartItem = state.cartItems[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems = [...state.cartItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
    }

    return {
      cartItems: updatedItems,
      totalItems: state.totalItems + 1,
      totalAmount: state.totalAmount + action.payload.price,
    };
  }

  if (action.type === 'REMOVE_FROM_CART') {
    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.payload.id
    );

    if (existingCartItemIndex === -1) {
      return state;
    }

    const existingCartItem = state.cartItems[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem.quantity === 1) {
      updatedItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems = [...state.cartItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      cartItems: updatedItems,
      totalItems: state.totalItems - 1,
      totalAmount: state.totalAmount - existingCartItem.price,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItem = (item) => {
    dispatchCartAction({ type: 'ADD_TO_CART', payload: item });
  };

  const removeItem = (id) => {
    dispatchCartAction({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const cartContext = {
    cartItems: cartState.cartItems,
    totalItems: cartState.totalItems,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
