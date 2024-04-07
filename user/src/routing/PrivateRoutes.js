import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('customer'));
  console.log(getTokenFromLocalStorage);
  return getTokenFromLocalStorage !== null ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
