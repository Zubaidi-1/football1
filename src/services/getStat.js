import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getStats = async (league_id) => {
  try {
    const response = await axios.get(`${API_URL}stat`, {
      params: { league_id },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);

    return { status: false, error: error.message };
  }
};
