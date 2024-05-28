// paymentService.js
import axios from 'axios';
import { base_url, config } from "../../utils/axiosConfig";

const addPaymentAccount = async (accountNumber) => {
  try {
    const response = await axios.post(`${base_url}payment/changePaymentAddress`, { accountNumber }, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getPaymentAddress = async () => {
  try {
    const response = await axios.get(`${base_url}payment/getPaymentAddress`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const paymentService = {
  addPaymentAccount,
  getPaymentAddress,
};

export default paymentService;