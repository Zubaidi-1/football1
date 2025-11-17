import cron from "node-cron";
import dotenv from "dotenv";
import axios from "axios";
import League from "../models/League.js";
import { leagues } from "./leagues.js";
import Stat from "../models/Stat.js";
dotenv.config();

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

cron.schedule("* *  * * *", async () => {
  try {
    const options = {
      method: "GET",
      url: `${API_URL}leagues`,
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-apisports-key": API_KEY,
      },
    };
    const response = await axios.request(options);
    const leagues = response.data;
    for (const league of leagues) {
      await League.upsert({
        league_id: league.id,
        name: league.name,
        country: country.name,
        logo: league.logo,
        type: league.type,
        seasons: item.seasons,
      });
    }
  } catch (error) {
    console.error(`An error has occured ${error.message}`);
  }
});

// ! league details cron jobs
// ! only goals / assists for now
// ? I might just get everthing with one call

cron.schedule("* *  * * *", async () => {
  console.log("WERE AM I ");

  let options = {
    method: "GET",
    url: `${API_URL}players/topscorers`,
    params: {
      league: "*",
      season: new Date().getFullYear(),
    },
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-apisports-key": API_KEY,
    },
  };
  try {
    for (let league of leagues) {
      options.params.league = league.league_id;
      const response = await axios.get(`${API_URL}players/topscorers`, {
        params: {
          league: league.league_id,
          season: new Date().getFullYear(),
        },
        headers: {
          "x-apisports-key": API_KEY,
        },
      });
      // console.log(response.data.response, league.league_id);

      for (let player of response.data.response) {
        await Stat.upsert({
          league_id: league.league_id,
          player_id: player.player.id,
          player: player.player,
          statistics: player.statistics,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
});
