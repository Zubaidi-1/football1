import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const League = sequelize.define("League", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  league_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { len: [3, 100] },
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  seasons: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

export default League;
