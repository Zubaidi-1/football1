import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getFixtures = async () => {
  try {
    const fixtures = [];
    const response = await axios.get(`${API_URL}matches`);
    console.log("responses", response);

    if (response.data.data.length > 0) {
      fixtures.push(response.data.data);
      return { status: true, data: fixtures };
    } else return { status: true, data: "No fixtures" };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

export const getFixturesByLeague = async (league_id) => {
  try {
    const fixtures = [];
    const response = await axios.get(`${API_URL}matches/league`, {
      params: { league_id },
    });
    console.log("responses", response);

    if (response.data.data.length > 0) {
      fixtures.push(response.data.data);
      return { status: true, data: fixtures };
    } else return { status: true, data: "No fixtures" };
  } catch (error) {
    console.log(error);

    return { status: false, error: error.message };
  }
};
