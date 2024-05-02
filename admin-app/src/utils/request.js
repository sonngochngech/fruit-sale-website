export const base_url = "https://fakestoreapi.com/";
const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      localStorage.getItem("jwt")
    }`,
    Accept: "application/json",
  },
};
