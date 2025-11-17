import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setLeague: (state, action) => {
      state.value = action.payload;
    },
    resetLeague: (state) => {
      state.value = 0;
    },
  },
});

export const { setLeague, resetLeague } = leagueSlice.actions;
export default leagueSlice.reducer;
