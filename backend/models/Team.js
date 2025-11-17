import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db/db.js";
import League from "./League.js";

const Team = sequelize.define("Team", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 100],
    },
  },
  team_key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  League_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: League,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});
export default Team;
