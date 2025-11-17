import sequelize from "../db/db";
import League from "./League.js";
import Team from "./Team.js";
import Player from "./Player.js";
import Match from "./Match.js";
import Highlight from "./Highlight.js";
import Stat from "./Stat.js";

// Define associations
League.hasMany(Team, {
  foreignKey: "League_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Team.belongsTo(League, { foreignKey: "League_id" });
Team.hasMany(Player, {
  foreignKey: "Team_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Player.belongsTo(Team, { foreignKey: "Team_id" });
Match.hasOne(Highlight, { foreignKey: "match_id", onDelete: "CASCADE" });
Highlight.belongsTo(Match, { foreignKey: "match_id" });
Stat.belongsTo(League, { foreignKey: "league_id" });
League.hasOne(Stat, { foreignKey: "league_id" });
export { Match, Highlight };

export { sequelize, League, Team, Player, Match, Highlight };
