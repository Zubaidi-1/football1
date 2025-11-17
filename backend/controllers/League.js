import { Op, where } from "sequelize";
import League from "../models/League.js";
import Standing from "../models/Standing.js";
import { leagues } from "../services/leagues.js";
export const getLeagueStandings = async (req, res) => {
  try {
    const { leagueId } = req.query;

    const standings = await Standing.findAll({
      where: { league_id: leagueId },
    });
    const data = standings.map((s) => {
      let data = s.dataValues;
      let league = JSON.parse(data.league);
      let standings = JSON.parse(data.standings);
      return {
        league,
        standings,
        league_id: data.league_id,
        season: data.season,
      };
    });
    console.log(data);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const getLeagues = async (req, res) => {
  try {
    const getleagues = await League.findAll({
      where: {
        league_id: { [Op.in]: leagues.map((league) => league.league_id) },
      },
    });
    const parsedLeagues = getleagues.map((league) => {
      const data = league.dataValues;
      return {
        ...data,
        seasons: JSON.parse(data.seasons),
      };
    });
    res.status(200).json({ success: true, data: parsedLeagues });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ error: "Failed to get leagues", message: error.message });
  }
};
