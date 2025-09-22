import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/properties`;

// Sab properties fetch karne ka function
export const getAllProperties = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data; // yaha directly data return ho raha hai
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};
