import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import db from "./db/db.js";
import { fileURLToPath } from "url";
import "./models/User.js";
import "./models/Match.js";
import "./models/Team.js";
import "./models/League.js";
import "./models/Player.js";
import "./models/Highlight.js";
import "./models/Stat.js";
import leagueRouter from "./routes/league.js";
import statRouter from "./routes/stat.js";

import userRouter from "./routes/user.js";
import sequelize from "./db/db.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import "./services/getFixtures.js";
import "./services/getLeagues.js";

import matchRouter from "./routes/matches.js";
import { i } from "framer-motion/client";
dotenv.config({ path: path.join(__dirname, ".env") });
const app = express();
import { leagues } from "./services/leagues.js";
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes
app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/", leagueRouter);
app.use("/api/", statRouter);

// Test DB connection and sync models
try {
  await sequelize.authenticate();
  console.log("✅ Database connected successfully.");
} catch (error) {
  console.error("❌ Database connection failed:", error);
}
await sequelize.sync({ force: true });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
