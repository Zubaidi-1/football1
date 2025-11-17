import { Op } from "sequelize";
import Stat from "../models/Stat.js";

export const getStat = async (req, res) => {
  try {
    const { league_id } = req.query;

    const stats = await Stat.findAll({
      where: { league_id },
      raw: true,
    });

    if (!stats.length)
      return res.status(404).json({ status: false, message: "No stats found" });
    for (let stat of stats) {
      stat.player = JSON.parse(stat.player);
      stat.statistics = JSON.parse(stat.statistics);
    }
    return res.status(200).json({ status: true, data: stats });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `An error has occurred: ${error.message}` });
  }
};
