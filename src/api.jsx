// src/api.js
import axios from 'axios';

export const fetchProduct = async (product_id) => {
  try {
    const result = await axios.get(`http://127.0.0.1:5000/api/products/${product_id}`);
    return result.data;
  } catch (error) {
    console.error("Error fetching the product data", error);
    throw error;
  }
};
