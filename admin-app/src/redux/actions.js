// actions.js
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const createProduct = (product) => ({
  type: 'CREATE_PRODUCT',
  payload: product,
});


export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});