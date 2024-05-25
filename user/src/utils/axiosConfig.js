export const base_url = "https://fruit-sale-v1-main.onrender.com/api/";
// export const base_url = "http://localhost:8081/api/";
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

export const base_domain="https://fruit-sale-v1-main.onrender.com/"
export const base_URL="https://fruit-sale-v1-main.onrender.com"
export const base_domain_client="https://fruit-sale-react-application-main.onrender.com"
// export const base_domain="http://localhost:8081/"
// export const base_URL="http://localhost:8081"
// export const base_domain_client="http://localhost:3000/"

