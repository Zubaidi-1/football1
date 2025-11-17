// ? Idk  if i should put this here or in their components but whatever
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export const gettopLeaguesStandings = async (leagueId) => {
  try {
    const standingsData = [];

    const response = await axios.get(`${API_URL}standings`, {
      params: { leagueId },
    });

    if (response.data.length > 0) {
      standingsData.push(response.data[0]);
    } else {
      console.warn(`No standings data found for league ID: ${leagueId}`);
    }

    return { success: true, data: standingsData, error: null };
  } catch (error) {
    console.error("Error fetching standings:", error);
    return { success: false, data: null, error: error.message };
  }
};
