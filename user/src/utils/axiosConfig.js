export const base_url = "http://localhost:8081/api/";
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

export const base_domain="http://localhost:8081/"