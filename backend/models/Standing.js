import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Standing = sequelize.define("Standing", {
  league_id: { type: DataTypes.INTEGER, allowNull: false },
  season: { type: DataTypes.INTEGER, allowNull: false },
  league: {
    // ! accepts id, name, country, logo, flag
    type: DataTypes.JSON,
    allowNull: false,
  },
  standings: {
    // ! accepts array of team standings
    type: DataTypes.JSON,
    allowNull: false,
  },
});

export default Standing;
