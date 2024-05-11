export const base_url = "https://fruit-sale-v1-2-0.onrender.com/api/";
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

export const base_domain="https://fruit-sale-v1-2-0.onrender.com/";
