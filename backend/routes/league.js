import express from "express";
import { getLeagues, getLeagueStandings } from "../controllers/League.js";

const router = express.Router();

// Route to get league standings by league ID
router.get("/standings/", getLeagueStandings);
router.get("/leagues", getLeagues);

export default router;
