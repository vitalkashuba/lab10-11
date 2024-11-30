import { ADD_TO_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_FROM_CART } from "./actions";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id && item.format === action.payload.format
      );
      if (existingItemIndex >= 0) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };
    case REMOVE_FROM_CART:
        return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        };  
    default:
      return state;
  }
};

export default cartReducer;
