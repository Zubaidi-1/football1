import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getLeagues = async () => {
  try {
    const leagues = [];
    const response = await axios.get(`${API_URL}leagues`);
    console.log("responses", response);

    if (response.data.data.length > 0) {
      leagues.push(response.data.data);
      return { status: true, data: leagues };
    } else return { status: true, data: "leagues" };
  } catch (error) {
    console.log(error);

    return { status: false, error: error.message };
  }
};
