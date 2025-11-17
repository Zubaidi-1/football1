import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db/db.js";
import Match from "./Match.js";

const Highlight = sequelize.define("Highlight", {
  match_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Highlight;
