import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Stat = sequelize.define(
  "Stat",
  {
    league_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    player: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    statistics: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["league_id", "player_id"],
      },
    ],
  }
);

export default Stat;
