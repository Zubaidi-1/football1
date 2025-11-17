import express from "express";
import { getMatches, getMatchesByLeague } from "../controllers/Match.js";

const router = express.Router();

router.get("/", getMatches);
router.get("/league", getMatchesByLeague);

export default router;
