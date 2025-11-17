// models/Match.js
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Match = sequelize.define("Match", {
  match_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  referee: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timezone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  venue: {
    // ! accepts id, name, city
    type: DataTypes.JSON,
    allowNull: true,
  },
  status: {
    // ! accepts long, short, elapsed and extra
    type: DataTypes.JSON,
    allowNull: false,
  },
  league_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  league_info: {
    // ! accepts  name, country, logo, flag, season, round
    type: DataTypes.JSON,
    allowNull: false,
  },
  teams: {
    // ! accepts home and away team objects
    type: DataTypes.JSON,
    allowNull: false,
  },
  goals: {
    // ! accepts home and away goals
    type: DataTypes.JSON,
    allowNull: true,
  },
  score: {
    // ! accepts halftime, fulltime, extratime, penalty
    type: DataTypes.JSON,
    allowNull: true,
  },
});

export default Match;
