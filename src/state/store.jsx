import { configureStore } from "@reduxjs/toolkit";
import leagueReducer from "./league/leagueSlice";
import leaguesReducer from "./leagues/leaguesSlice";
import fixtureReducer from "./fixtures/fixture";
export const store = configureStore({
  reducer: {
    league: leagueReducer,
    leagues: leaguesReducer,
    fixture: fixtureReducer,
  },
});
