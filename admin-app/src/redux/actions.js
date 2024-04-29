// actions.js
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_EDIT_PRODUCT = 'SET_EDIT_PRODUCT';


export const createProduct = (product) => ({
  type: 'CREATE_PRODUCT',
  payload: product,
});


export const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  payload: product,
});

// Thêm action và reducer mới để lưu thông tin sản phẩm cần chỉnh sửa vào store
export const setEditProduct = (productData) => ({
  type: SET_EDIT_PRODUCT,
  payload: productData,
});