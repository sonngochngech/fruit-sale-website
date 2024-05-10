import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getFruits = async () => {

  try {
    const response = await axios.get(`${base_url}fruits`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};


// const searchFruitByCategory=async(params){

// }

const getFruitCategories = async () => {
  try {
    const response = await axios.get(`${base_url}categories`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};
const getSingleFruit= async (id) => {
  try {
    const response = await axios.get(`${base_url}fruits/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const addToWishList = async (fruitId) => {
  const response = await axios.post(
    `${base_url}carts/add`,
    { fruitId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  if (response.data) {
    return response.data;
  }
};

const searchFruit=async(name)=>{
  try {
    const response = await axios.get(`${base_url}fruits/search?title=${name}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }

}

export const fruitService = {
    getFruits,
  getSingleFruit,
  addToWishList,
  getFruitCategories,
  searchFruit
};
