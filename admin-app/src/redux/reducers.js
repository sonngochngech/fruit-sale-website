import { CREATE_PRODUCT, DELETE_PRODUCT } from "./actions";

const initialState = {
  products: [], // Array to store product objects
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      let temp = state.temp || 0; // Initialize temp if not present in state
      temp += 1; // Increment temp

      const newProduct = {
        id: temp, // Assign the incremented temp as the product ID
        ...action.payload, // Spread in the rest of the product data
      };

      console.log(newProduct);

      return {
        ...state,
        temp, // Update the temp value in state
        products: [...state.products, newProduct],
      };
    case DELETE_PRODUCT:
      const productId = action.payload; // Lấy productId từ action
      console.log(state)
      return {
        ...state,
        products: state.products.filter((product) => product.id !== productId),
      };
    default:
      return state;
  }
};

export default reducer;
