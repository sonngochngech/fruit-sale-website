import { CREATE_PRODUCT, DELETE_PRODUCT } from './actions';

const initialState = {
  products: [], // Array to store product objects
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = action.payload;
      console.log(newProduct)
      return {
        ...state,
        products: [...state.products, newProduct],
      };
    case DELETE_PRODUCT:
      const productId = action.payload; // Get product ID from action
      return {
        ...state,
        products: state.products.filter((product) => product.id !== productId),
      };
    default:
      return state;
  }
};

export default reducer;
