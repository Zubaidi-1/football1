import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";
import League from "../models/League.js";
import Standing from "../models/Standing.js";
import Match from "../models/Match.js";
import { leagues } from "./leagues.js";

dotenv.config();

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

const fetchAndStoreLeagues = cron.schedule("* * * * *", async () => {
  console.log("⚽ Fetching leagues from API-Football...");

  try {
    // 1️⃣ Bulk fetch all leagues
    const response = await axios.get(`${API_URL}leagues`, {
      headers: {
        "x-apisports-key": API_KEY,
      },
    });

    const leagues = response.data.response;
    console.log(`✅ Retrieved ${leagues.length} leagues`);

    const topLeagues = [39, 78, 140, 135, 61];
    for (const id of topLeagues) {
      try {
        const res = await axios.get(`${API_URL}leagues`, {
          params: { id },
          headers: { "x-apisports-key": API_KEY },
        });

        if (res.data.response?.length) {
          leagues.push(res.data.response[0]);
          console.log(`🌍 Added top league manually: ${id}`);
        }
      } catch (err) {
        console.warn(`⚠️ Failed to fetch top league ${id}:`, err.message);
      }
    }

    // 3️⃣ Store all leagues in DB
    for (const item of leagues) {
      const league = item.league;
      const country = item.country;

      await League.upsert({
        league_id: league.id,
        name: league.name,
        country: country.name,
        logo: league.logo,
        type: league.type,
        seasons: item.seasons,
      });

      console.log(` Saved: ${league.id}`);
    }

    console.log("✅ All leagues stored successfully!");
  } catch (error) {
    console.error(
      "❌ Error fetching leagues:",
      error.response?.data || error.message
    );
  }

  fetchAndStoreLeagues.stop(); // Stop the task after execution
});

fetchAndStoreLeagues.start(); // Start the scheduled task

// ⏰ Runs daily at 00:00
cron.schedule("* * * * *", async () => {
  console.log("⚽ Fetching top league standings...");

  for (const id of leagues) {
    try {
      const res = await axios.get(`${API_URL}standings`, {
        params: { league: id.league_id, season: new Date().getFullYear() },
        headers: { "x-apisports-key": API_KEY },
      });

      if (!res.data.response?.length) {
        console.warn(`⚠️ No standings data for league ${id}`);
        continue;
      }

      const leagueData = res.data.response[0].league; // from your image
      const standingsData = leagueData.standings[0]; // array of team standings

      // 🧠 Prepare clean payload
      const payload = {
        league_id: leagueData.id,
        season: leagueData.season,
        league: {
          id: leagueData.id,
          name: leagueData.name,
          country: leagueData.country,
          logo: leagueData.logo,
          flag: leagueData.flag,
        },
        standings: standingsData, // array of teams (rank, points, etc.)
      };

      await Standing.upsert(payload, {
        where: { league_id: leagueData.id, season: leagueData.season },
      });
    } catch (err) {
      console.warn(` Failed to fetch standings for league ${id}:`, err.message);
    }
  }

  console.log("All standings updated successfully.");
});

// // *  fetch fixtures on a daily basis at 00:00
// cron.schedule("* * * * *", async () => {
//   console.log("📅 Fetching today's fixtures...");
//   try {
//     const today = new Date();

//     const from = today.toISOString().split("T")[0];

//     const response = await axios.get(`${API_URL}fixtures`, {
//       params: {
//         date: from,
//       },
//       headers: {
//         "x-apisports-key": API_KEY,
//       },
//     });

//     const fixtures = response.data;

//     console.log(Array.isArray(fixtures.response));
//     for (const item of fixtures.response) {
//       await Match.upsert({
//         match_id: item.fixture.id,
//         referee: item.fixture.referee,
//         timezone: item.fixture.timezone,
//         date: item.fixture.date,
//         venue: item.fixture.venue.name,
//         status: item.fixture.status.short,
//         league: item.league.id,
//         teams: item.teams,
//         goals: item.goals,
//         score: item.score,
//         league_id: item.league.id,
//         league_info: {
//           name: item.league.name,
//           country: item.league.country,
//           logo: item.league.logo,
//           flag: item.league.flag,
//           season: item.league.season,
//           round: item.league.round,
//         },
//       });
//     }
//   } catch (error) {
//     console.error(" Error fetching fixtures:", error.message);
//   }
// });

cron.schedule("* * * * *", async () => {
  try {
    for (let league of leagues) {
      const response = await axios.get(`${API_URL}fixtures`, {
        params: {
          league: league.league_id,
          season: new Date().getFullYear(),
        },
        headers: {
          "x-apisports-key": API_KEY,
        },
      });
      for (const item of response.data.response) {
        await Match.upsert({
          match_id: item.fixture.id,
          referee: item.fixture.referee ?? null,
          timezone: item.fixture.timezone,
          date: item.fixture.date,
          venue: item.fixture.venue.name,
          status: item.fixture.status.short,
          teams: item.teams,
          goals: item.goals,
          score: item.score,
          league_id: item.league.id,
          league_info: {
            name: item.league.name,
            country: item.league.country,
            logo: item.league.logo,
            flag: item.league.flag,
            season: item.league.season,
            round: item.league.round,
          },
        });
      }
    }
  } catch (error) {
    console.error(" Error fetching fixtures:", error.message);
  }
});
