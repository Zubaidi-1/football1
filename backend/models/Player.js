import { DataTypes, Model, Sequelize } from "sequelize";

import sequelize from "../db/db.js";
import Team from "./Team.js";

const Player = sequelize.define("Player", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50],
    },
  },
  player_key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 15,
      max: 55,
    },
    matches_played: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    goals_scored: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    yellow_cards: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    red_cards: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { Model: Team, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});
