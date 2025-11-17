import dotenv from "dotenv";
import Match from "../models/Match.js";
import axios from "axios";
import { Op, where } from "sequelize";
dotenv.config();
import { leagues } from "../services/leagues.js";
export const getMatches = async (req, res) => {
  try {
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    const matches = await Match.findAll({
      where: {
        date: {
          [Op.between]: [start, end],
        },
      },
    });

    console.log("matches", matches);

    const parsedMatches = matches.map((match) => {
      const data = match.dataValues;

      return {
        ...data,
        league_info: JSON.parse(data.league_info),
        goals: JSON.parse(data.goals),
        score: JSON.parse(data.score),
        teams: JSON.parse(data.teams),
      };
    });

    res.status(200).json({ data: parsedMatches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
};

export const getMatchesByLeague = async (req, res) => {
  try {
    const { league_id } = req.query;
    console.log(league_id);

    const matches = await Match.findAll({ where: { league_id: league_id } });
    const parsedMatches = matches.map((match) => {
      const data = match.dataValues;

      return {
        ...data,
        league_info: JSON.parse(data.league_info),
        goals: JSON.parse(data.goals),
        score: JSON.parse(data.score),
        teams: JSON.parse(data.teams),
      };
    });

    res.status(200).json({ data: parsedMatches });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
};
